const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testFileUpload() {
    try {
        // First, login to get a token
        console.log('Logging in...');
        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'demo@monexa.com',
            password: 'password123'
        });
        
        console.log('Login successful, token:', loginResponse.data.token);
        const token = loginResponse.data.token;
        
        // Create a simple text file to test upload
        const testFileName = 'test-audio.mp3';
        const testFilePath = path.join(__dirname, testFileName);
        
        // Create a dummy MP3 file (just empty for testing)
        fs.writeFileSync(testFilePath, 'dummy mp3 content for testing');
        
        console.log('Created test file:', testFilePath);
        
        // Create form data
        const formData = new FormData();
        formData.append('document', fs.createReadStream(testFilePath));
        formData.append('title', 'Test Beat');
        formData.append('category', 'beat');
        
        console.log('Uploading file...');
        
        // Upload file
        const uploadResponse = await axios.post('http://localhost:5000/api/documents/upload', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                ...formData.getHeaders()
            }
        });
        
        console.log('Upload response:', uploadResponse.data);
        
        // Clean up test file
        fs.unlinkSync(testFilePath);
        console.log('Test file deleted');
        
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

testFileUpload();
