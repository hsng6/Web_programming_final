const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['TOPS', 'PANTS', 'OUTER', 'SHOES']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  colors: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  // 재고 관리 (사이즈별)
  stock: {
    S: { type: Number, default: 0, min: 0 },
    M: { type: Number, default: 0, min: 0 },
    L: { type: Number, default: 0, min: 0 },
    XL: { type: Number, default: 0, min: 0 },
    FREE: { type: Number, default: 0, min: 0 }
  },
  // AI 핏 추천 데이터
  fitInfo: {
    recommendedHeight: {
      min: Number,
      max: Number
    },
    recommendedWeight: {
      min: Number,
      max: Number
    },
    fitType: {
      type: String,
      enum: ['슬림', '레귤러', '루즈', '오버핏']
    },
    stretchability: {
      type: String,
      enum: ['없음', '약간', '보통', '많음']
    }
  },
  // 통계
  views: {
    type: Number,
    default: 0
  },
  sales: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
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
productSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// 평균 평점 계산 메서드
productSchema.methods.updateAverageRating = async function () {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    { $match: { productId: this._id } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    this.averageRating = Math.round(stats[0].avgRating * 10) / 10;
    this.reviewCount = stats[0].count;
  } else {
    this.averageRating = 0;
    this.reviewCount = 0;
  }

  await this.save();
};

module.exports = mongoose.model('Product', productSchema);
