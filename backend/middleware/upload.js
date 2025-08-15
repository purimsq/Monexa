const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// Ensure uploads directory exists
const ensureUploadDir = async (subDir = '') => {
    const uploadDir = path.join(__dirname, '..', 'uploads', subDir);
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }
    return uploadDir;
};

// Storage configuration
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            // Create user-specific directory
            const userDir = await ensureUploadDir(req.user?.id || 'temp');
            cb(null, userDir);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = uuidv4();
        const extension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, extension);
        const fileName = `${baseName}_${uniqueSuffix}${extension}`;
        cb(null, fileName);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Allowed file types
    const allowedTypes = {
        documents: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain',
            'text/csv'
        ],
        images: [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp'
        ],
        audio: [
            'audio/mpeg',
            'audio/wav',
            'audio/mp3',
            'audio/m4a',
            'audio/aac',
            'audio/flac',
            'audio/x-wav',
            'audio/x-mpeg'
        ],
        video: [
            'video/mp4',
            'video/mpeg',
            'video/quicktime',
            'video/x-msvideo',
            'video/webm',
            'video/ogg'
        ]
    };

    const allAllowedTypes = [
        ...allowedTypes.documents,
        ...allowedTypes.images,
        ...allowedTypes.audio,
        ...allowedTypes.video
    ];

    if (allAllowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`File type ${file.mimetype} not allowed`), false);
    }
};

// Upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 200 * 1024 * 1024, // 200MB max file size (for video files)
        files: 10 // Maximum 10 files per request
    }
});

// Single file upload
const uploadSingle = (fieldName) => upload.single(fieldName);

// Multiple files upload
const uploadMultiple = (fieldName, maxCount = 10) => upload.array(fieldName, maxCount);

// Upload fields (for different file types)
const uploadFields = (fields) => upload.fields(fields);

// Error handler for multer
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File too large. Maximum size is 200MB'
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                error: 'Too many files. Maximum 10 files allowed'
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                success: false,
                error: 'Unexpected field name'
            });
        }
    }

    if (err.message && err.message.includes('not allowed')) {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }

    next(err);
};

// Get file info
const getFileInfo = (file) => {
    return {
        originalName: file.originalname,
        fileName: file.filename,
        filePath: file.path,
        fileSize: file.size,
        fileType: file.mimetype,
        uploadDate: new Date().toISOString()
    };
};

// Delete file
const deleteFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
        return true;
    } catch (error) {
        console.error('Failed to delete file:', error);
        return false;
    }
};

// Get file mime type category
const getFileCategory = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('word') || mimeType.includes('document')) return 'document';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'spreadsheet';
    if (mimeType.includes('text')) return 'text';
    return 'other';
};

module.exports = {
    upload,
    uploadSingle,
    uploadMultiple,
    uploadFields,
    handleUploadError,
    getFileInfo,
    deleteFile,
    getFileCategory,
    ensureUploadDir
};
