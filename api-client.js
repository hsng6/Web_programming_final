// API 설정
const API_URL = 'http://localhost:3000/api';

// API 유틸리티 함수
const api = {
  // 인증 헤더 생성
  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  },

  // GET 요청
  async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },

  // POST 요청
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  },

  // PATCH 요청
  async patch(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('API PATCH error:', error);
      throw error;
    }
  },

  // DELETE 요청
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('API DELETE error:', error);
      throw error;
    }
  },

  // 응답 처리
  async handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || '요청 처리 중 오류가 발생했습니다.');
    }
    return data;
  }
};

// 인증 API
const authAPI = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    return response;
  },

  async login(username, password) {
    const response = await api.post('/auth/login', { username, password });
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
    }
    return response;
  },

  async verify() {
    return await api.get('/auth/verify');
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }
};

// 상품 API
const productsAPI = {
  async getAll(filters = {}) {
    const params = new URLSearchParams(filters);
    return await api.get(`/products?${params}`);
  },

  async getById(id) {
    return await api.get(`/products/${id}`);
  },

  async updateStock(id, size, quantity) {
    return await api.patch(`/products/${id}/stock`, { size, quantity });
  },

  async getTrending() {
    return await api.get('/products/recommendations/trending');
  },

  async getNew() {
    return await api.get('/products/recommendations/new');
  }
};

// 사용자 API
const usersAPI = {
  async getProfile(userId) {
    return await api.get(`/users/${userId}`);
  },

  async updateProfile(userId, userData) {
    return await api.patch(`/users/${userId}`, userData);
  },

  async updateAIFit(userId, fitData) {
    return await api.patch(`/users/${userId}/ai-fit`, fitData);
  },

  async addToWishlist(userId, productId) {
    return await api.post(`/users/${userId}/wishlist/${productId}`);
  },

  async removeFromWishlist(userId, productId) {
    return await api.delete(`/users/${userId}/wishlist/${productId}`);
  },

  async addViewHistory(userId, productId) {
    return await api.post(`/users/${userId}/view-history/${productId}`);
  }
};

// 주문 API
const ordersAPI = {
  async create(orderData) {
    return await api.post('/orders', orderData);
  },

  async getUserOrders(userId) {
    return await api.get(`/orders/user/${userId}`);
  },

  async getById(orderId) {
    return await api.get(`/orders/${orderId}`);
  },

  async updateStatus(orderId, status) {
    return await api.patch(`/orders/${orderId}/status`, { status });
  },

  async updateShipping(orderId, shippingData) {
    return await api.patch(`/orders/${orderId}/shipping`, shippingData);
  }
};

// 리뷰 API
const reviewsAPI = {
  async getByProduct(productId, filter) {
    const params = filter ? `?filter=${filter}` : '';
    return await api.get(`/reviews/product/${productId}${params}`);
  },

  async create(reviewData) {
    return await api.post('/reviews', reviewData);
  },

  async update(reviewId, reviewData) {
    return await api.patch(`/reviews/${reviewId}`, reviewData);
  },

  async delete(reviewId) {
    return await api.delete(`/reviews/${reviewId}`);
  },

  async addHelpful(reviewId) {
    return await api.post(`/reviews/${reviewId}/helpful`);
  }
};

// 쿠폰 API
const couponsAPI = {
  async getUserCoupons(userId) {
    return await api.get(`/coupons/user/${userId}`);
  },

  async getByCode(code) {
    return await api.get(`/coupons/code/${code}`);
  },

  async register(code) {
    return await api.post('/coupons/register', { code });
  },

  async use(code, orderTotal) {
    return await api.post('/coupons/use', { code, orderTotal });
  }
};

// 문의 API
const inquiriesAPI = {
  async getUserInquiries(userId) {
    return await api.get(`/inquiries/user/${userId}`);
  },

  async create(inquiryData) {
    return await api.post('/inquiries', inquiryData);
  },

  async respond(inquiryId, message) {
    return await api.patch(`/inquiries/${inquiryId}/respond`, { message });
  },

  async delete(inquiryId) {
    return await api.delete(`/inquiries/${inquiryId}`);
  }
};

// LocalStorage와 API 동기화 헬퍼
const syncHelper = {
  // LocalStorage 데이터를 서버로 마이그레이션
  async migrateToServer() {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        console.log('로그인된 사용자가 없습니다.');
        return;
      }

      console.log('🔄 데이터 마이그레이션 시작...');

      // 찜 목록 동기화
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      for (const productId of wishlist) {
        try {
          await usersAPI.addToWishlist(currentUser.id, productId);
        } catch (error) {
          console.warn('찜 목록 동기화 실패:', productId, error);
        }
      }

      // 조회 히스토리 동기화
      const viewHistory = JSON.parse(localStorage.getItem('viewHistory')) || [];
      for (const productId of viewHistory.slice(-20)) {
        try {
          await usersAPI.addViewHistory(currentUser.id, productId);
        } catch (error) {
          console.warn('조회 히스토리 동기화 실패:', productId, error);
        }
      }

      console.log('✅ 데이터 마이그레이션 완료');
    } catch (error) {
      console.error('❌ 마이그레이션 중 오류:', error);
    }
  },

  // 서버 데이터를 LocalStorage로 동기화 (오프라인 지원)
  async syncFromServer() {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) return;

      // 사용자 프로필 동기화
      const profile = await usersAPI.getProfile(currentUser.id);
      localStorage.setItem('wishlist', JSON.stringify(profile.wishlist || []));

      // 주문 내역 동기화
      const orders = await ordersAPI.getUserOrders(currentUser.id);
      localStorage.setItem('orders', JSON.stringify(orders));

      // 쿠폰 동기화
      const coupons = await couponsAPI.getUserCoupons(currentUser.id);
      localStorage.setItem('userCoupons', JSON.stringify(coupons));

      console.log('✅ 서버 데이터 동기화 완료');
    } catch (error) {
      console.warn('서버 동기화 실패, 로컬 데이터 사용:', error);
    }
  }
};
