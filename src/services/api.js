// API Service for communicating with Monexa Backend
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.token = localStorage.getItem('monexa_token');
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('monexa_token', token);
        } else {
            localStorage.removeItem('monexa_token');
        }
    }

    // Get authentication headers
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: this.getHeaders(),
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // GET request
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    // POST request
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // POST FormData request (for file uploads)
    async postFormData(endpoint, formData) {
        try {
            console.log('API postFormData called with endpoint:', endpoint);
            console.log('Token available:', !!this.token);
            
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    ...(this.token && { Authorization: `Bearer ${this.token}` })
                    // Don't set Content-Type for FormData, let the browser set it with boundary
                },
                body: formData
            });

            console.log('Upload response status:', response.status, response.statusText);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
                console.error('Upload failed with error:', errorData);
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Upload successful:', result);
            return result;
        } catch (error) {
            console.error('FormData request failed:', error);
            throw error;
        }
    }

    // PUT request
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // File upload request
    async upload(endpoint, formData) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            method: 'POST',
            headers: {
                'Authorization': this.token ? `Bearer ${this.token}` : '',
            },
            body: formData,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    }

    // Authentication APIs
    async login(email, password, twoFactorToken = null) {
        const loginData = { email, password };
        if (twoFactorToken) {
            loginData.twoFactorToken = twoFactorToken;
        }
        const response = await this.post('/auth/login', loginData);
        if (response.success && response.token) {
            this.setToken(response.token);
        }
        return response;
    }

    async signup(userData) {
        const response = await this.post('/auth/signup', userData);
        if (response.success && response.token) {
            this.setToken(response.token);
        }
        return response;
    }

    async logout() {
        try {
            await this.post('/auth/logout');
        } catch (error) {
            console.error('Logout API call failed:', error);
        } finally {
            this.setToken(null);
        }
    }

    async getCurrentUser() {
        return this.get('/auth/me');
    }

    async refreshSession() {
        return this.post('/auth/refresh');
    }

    // User Management APIs
    async updateProfile(profileData) {
        return this.put('/users/profile', profileData);
    }

    async verifyPassword(password) {
        return this.post('/users/verify-password', { password });
    }

    async changePassword(currentPassword, newPassword) {
        return this.put('/users/password', { currentPassword, newPassword });
    }

    async getUserSettings() {
        return this.get('/users/settings');
    }

    async updateUserSettings(settings) {
        return this.put('/users/settings', settings);
    }

    // Cards APIs
    async getCards() {
        return this.get('/cards');
    }

    async addCard(cardData) {
        return this.post('/cards', cardData);
    }

    async updateCard(cardId, cardData) {
        return this.put(`/cards/${cardId}`, cardData);
    }

    async deleteCard(cardId) {
        return this.delete(`/cards/${cardId}`);
    }

    async setDefaultCard(cardId) {
        return this.put(`/cards/${cardId}/default`);
    }

    // Transactions APIs
    async getTransactions(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.get(`/transactions${query ? `?${query}` : ''}`);
    }

    async getTransaction(transactionId) {
        return this.get(`/transactions/${transactionId}`);
    }

    async createTransaction(transactionData) {
        return this.post('/transactions', transactionData);
    }

    async updateTransaction(transactionId, transactionData) {
        return this.put(`/transactions/${transactionId}`, transactionData);
    }

    async deleteTransaction(transactionId) {
        return this.delete(`/transactions/${transactionId}`);
    }

    async getTransactionStats(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.get(`/transactions/stats/summary${query ? `?${query}` : ''}`);
    }

    // Beneficiaries APIs
    async getBeneficiaries() {
        return this.get('/beneficiaries');
    }

    async createBeneficiary(beneficiaryData) {
        return this.post('/beneficiaries', beneficiaryData);
    }

    async getBeneficiary(beneficiaryId) {
        return this.get(`/beneficiaries/${beneficiaryId}`);
    }

    async addBeneficiary(beneficiaryData) {
        return this.post('/beneficiaries', beneficiaryData);
    }

    async updateBeneficiary(beneficiaryId, beneficiaryData) {
        return this.put(`/beneficiaries/${beneficiaryId}`, beneficiaryData);
    }

    async deleteBeneficiary(beneficiaryId) {
        return this.delete(`/beneficiaries/${beneficiaryId}`);
    }

    async searchBeneficiaries(query) {
        return this.get(`/beneficiaries/search/${encodeURIComponent(query)}`);
    }

    // Documents APIs
    async getDocuments(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.get(`/documents${query ? `?${query}` : ''}`);
    }

    async getDocument(documentId) {
        return this.get(`/documents/${documentId}`);
    }

    async uploadDocument(formData) {
        return this.postFormData('/documents/upload', formData);
    }

    async uploadMultipleDocuments(formData) {
        return this.postFormData('/documents/upload-multiple', formData);
    }

    async updateDocument(documentId, documentData) {
        return this.put(`/documents/${documentId}`, documentData);
    }

    async deleteDocument(documentId) {
        return this.delete(`/documents/${documentId}`);
    }

    async downloadDocument(documentId) {
        const url = `${API_BASE_URL}/documents/${documentId}/download`;
        const response = await fetch(url, {
            headers: {
                'Authorization': this.token ? `Bearer ${this.token}` : '',
            },
        });

        if (!response.ok) {
            throw new Error('Download failed');
        }

        return response.blob();
    }

    async getDocumentCategories() {
        return this.get('/documents/categories/list');
    }

    // Applications APIs
    async getApplications(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.get(`/applications${query ? `?${query}` : ''}`);
    }

    async getApplication(applicationId) {
        return this.get(`/applications/${applicationId}`);
    }

    async createApplication(applicationData) {
        return this.post('/applications', applicationData);
    }

    async updateApplication(applicationId, applicationData) {
        return this.put(`/applications/${applicationId}`, applicationData);
    }

    async deleteApplication(applicationId) {
        return this.delete(`/applications/${applicationId}`);
    }

    async getApplicationStats() {
        return this.get('/applications/stats/summary');
    }

    async getApplicationTypes() {
        return this.get('/applications/types/list');
    }

    // Notifications APIs
    async getNotifications(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.get(`/notifications${query ? `?${query}` : ''}`);
    }

    async getNotification(notificationId) {
        return this.get(`/notifications/${notificationId}`);
    }

    async markNotificationAsRead(notificationId) {
        return this.put(`/notifications/${notificationId}/read`);
    }

    async markNotificationAsUnread(notificationId) {
        return this.put(`/notifications/${notificationId}/unread`);
    }

    async markAllNotificationsAsRead() {
        return this.put('/notifications/read-all');
    }

    async deleteNotification(notificationId) {
        return this.delete(`/notifications/${notificationId}`);
    }

    async deleteAllReadNotifications() {
        return this.delete('/notifications/read-all');
    }

    async getNotificationStats() {
        return this.get('/notifications/stats/summary');
    }

    // Export APIs
    async requestExport(type, format) {
        return this.post('/exports/request', { type, format });
    }

    async getExportStatus(exportId) {
        return this.get(`/exports/status/${exportId}`);
    }

    async getExportHistory() {
        return this.get('/exports/history');
    }

    async downloadExport(exportId) {
        const url = `${API_BASE_URL}/exports/download/${exportId}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': this.token ? `Bearer ${this.token}` : '',
            },
        });

        if (!response.ok) {
            throw new Error('Download failed');
        }

        return response.blob();
    }



    // Goals APIs
    async getGoals() {
        return this.get('/goals');
    }

    async createGoal(goalData) {
        return this.post('/goals', goalData);
    }

    async updateGoalProgress(goalId, amount) {
        return this.put(`/goals/${goalId}/progress`, { amount });
    }

    async deleteGoal(goalId) {
        return this.delete(`/goals/${goalId}`);
    }

    // Security APIs
    async generate2FASecret() {
        return this.post('/security/2fa/generate');
    }

    async enable2FA(token) {
        return this.post('/security/2fa/enable', { token });
    }

    async disable2FA(token) {
        return this.post('/security/2fa/disable', { token });
    }

    async verify2FAToken(token) {
        return this.post('/security/2fa/verify', { token });
    }

    async getSecurityLogs(limit = 50) {
        return this.get(`/security/logs?limit=${limit}`);
    }

    async getLoginHistory(limit = 50) {
        return this.get(`/security/login-history?limit=${limit}`);
    }

    async getSecuritySettings() {
        return this.get('/security/settings');
    }

    async updateSecuritySettings(settings) {
        return this.put('/security/settings', settings);
    }

    async validatePassword(password) {
        return this.post('/security/validate-password', { password });
    }

    async getSessionInfo() {
        return this.get('/security/session');
    }

    async revokeOtherSessions() {
        return this.post('/security/revoke-other-sessions');
    }

    async getSecuritySummary() {
        return this.get('/security/summary');
    }

    // Health check
    async healthCheck() {
        return this.get('/health');
    }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
