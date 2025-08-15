const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpload() {
    try {
        // First, login to get a token
        console.log('Logging in...');
        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'demo@monexa.com',
            password: 'password123'
        });
        
        console.log('Login response:', loginResponse.data);
        const token = loginResponse.data.token;
        
        // Test get documents
        console.log('Getting documents...');
        const documentsResponse = await axios.get('http://localhost:5000/api/documents', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('Documents response:', documentsResponse.data);
        
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

testUpload();
