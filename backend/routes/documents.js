const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult, query } = require('express-validator');
const path = require('path');
const fs = require('fs').promises;
const database = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const { 
    uploadSingle, 
    uploadMultiple, 
    handleUploadError, 
    getFileInfo, 
    deleteFile, 
    getFileCategory 
} = require('../middleware/upload');

const router = express.Router();

// Get user documents with filtering and pagination
router.get('/', verifyToken, [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('category').optional().trim(),
    query('search').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        // Build WHERE clause
        let whereConditions = ['user_id = ?'];
        let queryParams = [req.user.id];

        if (req.query.category) {
            whereConditions.push('category = ?');
            queryParams.push(req.query.category);
        }

        if (req.query.search) {
            const searchQuery = `%${req.query.search}%`;
            whereConditions.push('(title LIKE ? OR description LIKE ? OR file_name LIKE ?)');
            queryParams.push(searchQuery, searchQuery, searchQuery);
        }

        const whereClause = whereConditions.join(' AND ');

        // Get documents
        const documents = await database.query(
            `SELECT id, title, description, file_name, file_size, file_type, 
                    category, is_public, created_at 
             FROM documents 
             WHERE ${whereClause} 
             ORDER BY created_at DESC 
             LIMIT ? OFFSET ?`,
            [...queryParams, limit, offset]
        );

        // Get total count
        const totalResult = await database.get(
            `SELECT COUNT(*) as total FROM documents WHERE ${whereClause}`,
            queryParams
        );

        // Add file category info and map field names for frontend compatibility
        const documentsWithCategories = documents.map(doc => ({
            ...doc,
            filename: doc.file_name, // Map file_name to filename for frontend
            uploaded_at: doc.created_at, // Map created_at to uploaded_at for frontend
            fileCategory: getFileCategory(doc.file_type),
            fileSizeFormatted: formatFileSize(doc.file_size)
        }));

        res.json({
            success: true,
            documents: documentsWithCategories,
            pagination: {
                page,
                limit,
                total: totalResult.total,
                totalPages: Math.ceil(totalResult.total / limit)
            }
        });

    } catch (error) {
        console.error('Get documents error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get documents'
        });
    }
});

// Get document by ID
router.get('/:documentId', verifyToken, async (req, res) => {
    try {
        const { documentId } = req.params;

        const document = await database.get(
            `SELECT * FROM documents 
             WHERE id = ? AND user_id = ?`,
            [documentId, req.user.id]
        );

        if (!document) {
            return res.status(404).json({
                success: false,
                error: 'Document not found'
            });
        }

        // Add additional info
        document.fileCategory = getFileCategory(document.file_type);
        document.fileSizeFormatted = formatFileSize(document.file_size);

        res.json({
            success: true,
            document
        });

    } catch (error) {
        console.error('Get document error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get document'
        });
    }
});

// Upload single document
router.post('/upload', verifyToken, uploadSingle('document'), [
    body('title').trim().isLength({ min: 1 }).withMessage('Title required'),
    body('description').optional().trim(),
    body('category').optional().trim(),
    body('is_public').optional().isBoolean()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Delete uploaded file if validation fails
            if (req.file) {
                await deleteFile(req.file.path);
            }
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors.array()
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No file uploaded'
            });
        }

        const { title, description, category, is_public } = req.body;
        const fileInfo = getFileInfo(req.file);
        const documentId = uuidv4();

        // Save document info to database
        await database.run(
            `INSERT INTO documents (
                id, user_id, title, description, file_name, file_path,
                file_size, file_type, category, is_public
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                documentId, req.user.id, title, description,
                fileInfo.originalName, fileInfo.filePath, fileInfo.fileSize,
                fileInfo.fileType, category || getFileCategory(fileInfo.fileType),
                is_public || false
            ]
        );

        // Get saved document
        const newDocument = await database.get(
            'SELECT * FROM documents WHERE id = ?',
            [documentId]
        );

        newDocument.fileCategory = getFileCategory(newDocument.file_type);
        newDocument.fileSizeFormatted = formatFileSize(newDocument.file_size);

        res.status(201).json({
            success: true,
            message: 'Document uploaded successfully',
            document: newDocument
        });

    } catch (error) {
        console.error('Upload document error:', error);
        
        // Delete uploaded file on error
        if (req.file) {
            await deleteFile(req.file.path);
        }

        res.status(500).json({
            success: false,
            error: 'Failed to upload document'
        });
    }
});

// Upload multiple documents
router.post('/upload-multiple', verifyToken, uploadMultiple('documents', 10), [
    body('titles').optional().isArray().withMessage('Titles must be an array'),
    body('descriptions').optional().isArray().withMessage('Descriptions must be an array'),
    body('categories').optional().isArray().withMessage('Categories must be an array'),
    body('defaultCategory').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Delete uploaded files if validation fails
            if (req.files) {
                for (const file of req.files) {
                    await deleteFile(file.path);
                }
            }
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors.array()
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No files uploaded'
            });
        }

        const { titles, descriptions, categories, defaultCategory } = req.body;
        const uploadedDocuments = [];

        // Process each file
        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const fileInfo = getFileInfo(file);
            const documentId = uuidv4();

            // Get title, description, category for this file
            const title = (titles && titles[i]) || file.originalname;
            const description = (descriptions && descriptions[i]) || '';
            const category = (categories && categories[i]) || defaultCategory || getFileCategory(fileInfo.fileType);

            try {
                // Save document info to database
                await database.run(
                    `INSERT INTO documents (
                        id, user_id, title, description, file_name, file_path,
                        file_size, file_type, category, is_public
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        documentId, req.user.id, title, description,
                        fileInfo.originalName, fileInfo.filePath, fileInfo.fileSize,
                        fileInfo.fileType, category, false
                    ]
                );

                // Get saved document
                const newDocument = await database.get(
                    'SELECT * FROM documents WHERE id = ?',
                    [documentId]
                );

                newDocument.fileCategory = getFileCategory(newDocument.file_type);
                newDocument.fileSizeFormatted = formatFileSize(newDocument.file_size);

                uploadedDocuments.push(newDocument);

            } catch (error) {
                console.error(`Failed to save document ${file.originalname}:`, error);
                // Delete the file if database save fails
                await deleteFile(file.path);
            }
        }

        res.status(201).json({
            success: true,
            message: `${uploadedDocuments.length} documents uploaded successfully`,
            documents: uploadedDocuments,
            totalFiles: req.files.length,
            successCount: uploadedDocuments.length
        });

    } catch (error) {
        console.error('Upload multiple documents error:', error);
        
        // Delete uploaded files on error
        if (req.files) {
            for (const file of req.files) {
                await deleteFile(file.path);
            }
        }

        res.status(500).json({
            success: false,
            error: 'Failed to upload documents'
        });
    }
});

// Update document info
router.put('/:documentId', verifyToken, [
    body('title').optional().trim().isLength({ min: 1 }).withMessage('Title required'),
    body('description').optional().trim(),
    body('category').optional().trim(),
    body('is_public').optional().isBoolean()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { documentId } = req.params;
        const { title, description, category, is_public } = req.body;

        // Check if document exists and belongs to user
        const document = await database.get(
            'SELECT id FROM documents WHERE id = ? AND user_id = ?',
            [documentId, req.user.id]
        );

        if (!document) {
            return res.status(404).json({
                success: false,
                error: 'Document not found'
            });
        }

        const updateFields = [];
        const updateValues = [];

        if (title !== undefined) {
            updateFields.push('title = ?');
            updateValues.push(title);
        }
        if (description !== undefined) {
            updateFields.push('description = ?');
            updateValues.push(description);
        }
        if (category !== undefined) {
            updateFields.push('category = ?');
            updateValues.push(category);
        }
        if (is_public !== undefined) {
            updateFields.push('is_public = ?');
            updateValues.push(is_public);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
        }

        updateValues.push(documentId);

        await database.run(
            `UPDATE documents SET ${updateFields.join(', ')} WHERE id = ?`,
            updateValues
        );

        // Get updated document
        const updatedDocument = await database.get(
            'SELECT * FROM documents WHERE id = ?',
            [documentId]
        );

        updatedDocument.fileCategory = getFileCategory(updatedDocument.file_type);
        updatedDocument.fileSizeFormatted = formatFileSize(updatedDocument.file_size);

        res.json({
            success: true,
            message: 'Document updated successfully',
            document: updatedDocument
        });

    } catch (error) {
        console.error('Update document error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update document'
        });
    }
});

// Delete document
router.delete('/:documentId', verifyToken, async (req, res) => {
    try {
        const { documentId } = req.params;

        // Get document info
        const document = await database.get(
            'SELECT * FROM documents WHERE id = ? AND user_id = ?',
            [documentId, req.user.id]
        );

        if (!document) {
            return res.status(404).json({
                success: false,
                error: 'Document not found'
            });
        }

        // Delete file from filesystem
        if (document.file_path) {
            await deleteFile(document.file_path);
        }

        // Delete from database
        await database.run(
            'DELETE FROM documents WHERE id = ?',
            [documentId]
        );

        res.json({
            success: true,
            message: 'Document deleted successfully'
        });

    } catch (error) {
        console.error('Delete document error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete document'
        });
    }
});

// Stream audio file for playback
router.get('/:documentId/stream', verifyToken, async (req, res) => {
    try {
        const { documentId } = req.params;

        const document = await database.get(
            'SELECT * FROM documents WHERE id = ? AND user_id = ?',
            [documentId, req.user.id]
        );

        if (!document) {
            return res.status(404).json({
                success: false,
                error: 'Document not found'
            });
        }

        // Check if file exists
        try {
            await fs.access(document.file_path);
        } catch {
            return res.status(404).json({
                success: false,
                error: 'File not found on server'
            });
        }

        // Set appropriate headers for audio streaming
        res.setHeader('Content-Type', document.file_type || 'audio/mpeg');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Length', document.file_size);
        
        // Stream the file
        const stream = require('fs').createReadStream(document.file_path);
        stream.pipe(res);

    } catch (error) {
        console.error('Stream document error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to stream document'
        });
    }
});

// Download document
router.get('/:documentId/download', verifyToken, async (req, res) => {
    try {
        const { documentId } = req.params;

        const document = await database.get(
            'SELECT * FROM documents WHERE id = ? AND user_id = ?',
            [documentId, req.user.id]
        );

        if (!document) {
            return res.status(404).json({
                success: false,
                error: 'Document not found'
            });
        }

        // Check if file exists
        try {
            await fs.access(document.file_path);
        } catch {
            return res.status(404).json({
                success: false,
                error: 'File not found on server'
            });
        }

        // Send file
        res.download(document.file_path, document.file_name);

    } catch (error) {
        console.error('Download document error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to download document'
        });
    }
});

// Get document categories
router.get('/categories/list', verifyToken, async (req, res) => {
    try {
        const categories = await database.query(
            `SELECT DISTINCT category, COUNT(*) as count 
             FROM documents 
             WHERE user_id = ? AND category IS NOT NULL 
             GROUP BY category 
             ORDER BY count DESC, category ASC`,
            [req.user.id]
        );

        res.json({
            success: true,
            categories
        });

    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get categories'
        });
    }
});

// Helper function to format file size
const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

// Apply upload error handler
router.use(handleUploadError);

module.exports = router;
