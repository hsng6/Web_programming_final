const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    size: String,
    quantity: Number,
    image: String
  }],
  subtotal: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    default: 3000
  },
  discount: {
    type: Number,
    default: 0
  },
  couponCode: {
    type: String
  },
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['카드', '계좌이체', '가상계좌', '토스페이']
  },
  recipient: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    message: String
  },
  status: {
    type: String,
    enum: ['결제완료', '상품준비중', '배송중', '배송완료', '구매확정', '취소', '환불'],
    default: '결제완료'
  },
  // 배송 추적 정보
  shipping: {
    courier: String,
    trackingNumber: String,
    timeline: [{
      status: String,
      location: String,
      timestamp: Date,
      description: String
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 업데이트 시 updatedAt 자동 갱신
orderSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Order', orderSchema);
