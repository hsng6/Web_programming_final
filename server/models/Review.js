const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  // 이미지 (Base64 또는 URL)
  images: [{
    type: String
  }],
  // 구매 검증
  verified: {
    type: Boolean,
    default: false
  },
  // AI 핏 정보 (옵션)
  fitFeedback: {
    size: String,
    height: Number,
    weight: Number,
    fitRating: {
      type: String,
      enum: ['작아요', '딱 맞아요', '커요']
    }
  },
  // 도움됨 카운트
  helpfulCount: {
    type: Number,
    default: 0
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
reviewSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// 리뷰 생성/삭제 후 상품 평균 평점 업데이트
reviewSchema.post('save', async function () {
  const Product = mongoose.model('Product');
  const product = await Product.findById(this.productId);
  if (product) {
    await product.updateAverageRating();
  }
});

reviewSchema.post('remove', async function () {
  const Product = mongoose.model('Product');
  const product = await Product.findById(this.productId);
  if (product) {
    await product.updateAverageRating();
  }
});

module.exports = mongoose.model('Review', reviewSchema);
