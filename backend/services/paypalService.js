const axios = require('axios');

class PayPalService {
  constructor() {
    this.clientId = 'ARwhHhZI251Rzf-pfyfP7jJPf0cKgZC3EskfOUSdz4aXufA9SStx3oCDjEspCr6SiY8Ok3OznjH_qL-V';
    this.clientSecret = 'EFOSIbCGAZYJ_BVY815TSYG8jFpPnEgAt5yGIWxDCVTHNC3MA2Crg4DdRXqvFesdGqmE3j8jrVDePl-6';
    this.baseURL = 'https://api-m.paypal.com'; // Production PayPal API
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    // Check if we have a valid token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      const response = await axios.post(`${this.baseURL}/v1/oauth2/token`, 
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      
      return this.accessToken;
    } catch (error) {
      console.error('PayPal authentication error:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with PayPal');
    }
  }

  async getAccountInfo(userEmail) {
    try {
      const token = await this.getAccessToken();
      
      // Get user's PayPal account information
      const response = await axios.get(`${this.baseURL}/v1/identity/oauth2/userinfo`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        account: response.data
      };
    } catch (error) {
      console.error('PayPal get account info error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Failed to get PayPal account information'
      };
    }
  }

  async getBalance() {
    try {
      const token = await this.getAccessToken();
      
      // Get account balance
      const response = await axios.get(`${this.baseURL}/v1/reporting/balances`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          currency_code: 'USD',
          as_of_time: new Date().toISOString()
        }
      });

      return {
        success: true,
        balance: response.data.balances[0]?.available_balance?.value || 0
      };
    } catch (error) {
      console.error('PayPal get balance error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Failed to get PayPal balance'
      };
    }
  }

  async sendMoney(fromEmail, toEmail, amount, note = '') {
    try {
      const token = await this.getAccessToken();
      
      const payoutData = {
        sender_batch_header: {
          sender_batch_id: `batch_${Date.now()}`,
          email_subject: 'You have a payment from Monexa',
          email_message: `You have received a payment of $${amount} from ${fromEmail}. ${note}`
        },
        items: [
          {
            recipient_type: 'EMAIL',
            amount: {
              value: amount.toString(),
              currency: 'USD'
            },
            receiver: toEmail,
            note: note,
            sender_item_id: `item_${Date.now()}`
          }
        ]
      };

      const response = await axios.post(`${this.baseURL}/v1/payments/payouts`, payoutData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        payout: response.data,
        transactionId: response.data.batch_header.payout_batch_id
      };
    } catch (error) {
      console.error('PayPal send money error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Failed to send money via PayPal'
      };
    }
  }

  async getTransactions(userEmail, startDate, endDate) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(`${this.baseURL}/v1/reporting/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          start_date: startDate,
          end_date: endDate,
          fields: 'transaction_info,payer_info,shipping_info,auction_info,cart_info,incentive_info,store_info'
        }
      });

      return {
        success: true,
        transactions: response.data.transaction_details || []
      };
    } catch (error) {
      console.error('PayPal get transactions error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Failed to get PayPal transactions'
      };
    }
  }

  async createPaymentRequest(fromEmail, toEmail, amount, note = '') {
    try {
      const token = await this.getAccessToken();
      
      const paymentData = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal'
        },
        transactions: [
          {
            amount: {
              total: amount.toString(),
              currency: 'USD'
            },
            description: note,
            custom: fromEmail
          }
        ],
        redirect_urls: {
          return_url: `${process.env.FRONTEND_URL}/paypal/success`,
          cancel_url: `${process.env.FRONTEND_URL}/paypal/cancel`
        }
      };

      const response = await axios.post(`${this.baseURL}/v1/payments/payment`, paymentData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        payment: response.data,
        approvalUrl: response.data.links.find(link => link.rel === 'approval_url')?.href
      };
    } catch (error) {
      console.error('PayPal create payment error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Failed to create PayPal payment request'
      };
    }
  }

  async executePayment(paymentId, payerId) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.post(`${this.baseURL}/v1/payments/payment/${paymentId}/execute`, {
        payer_id: payerId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        payment: response.data
      };
    } catch (error) {
      console.error('PayPal execute payment error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Failed to execute PayPal payment'
      };
    }
  }

  async validateUserCredentials(email, password) {
    // Note: This is a placeholder. PayPal doesn't provide direct credential validation
    // In a real implementation, you would use PayPal's OAuth flow
    try {
      const token = await this.getAccessToken();
      
      // Try to get user info to validate the account
      const response = await axios.get(`${this.baseURL}/v1/identity/oauth2/userinfo`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        user: response.data
      };
    } catch (error) {
      console.error('PayPal user validation error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Invalid PayPal credentials'
      };
    }
  }
}

module.exports = new PayPalService();
