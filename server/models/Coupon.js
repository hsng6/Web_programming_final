const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['fixed', 'percent']
  },
  discount: {
    type: Number,
    required: true,
    min: 0
  },
  minPurchase: {
    type: Number,
    default: 0,
    min: 0
  },
  maxDiscount: {
    type: Number,
    min: 0
  },
  expiryDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: null
  },
  usageCount: {
    type: Number,
    default: 0
  },
  // 사용자별 쿠폰 할당
  assignedUsers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    used: {
      type: Boolean,
      default: false
    },
    usedAt: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 쿠폰 유효성 검증 메서드
couponSchema.methods.isValid = function () {
  if (!this.isActive) return false;
  if (new Date() > this.expiryDate) return false;
  if (this.usageLimit && this.usageCount >= this.usageLimit) return false;
  return true;
};

// 사용자별 쿠폰 사용 가능 여부 확인
couponSchema.methods.canUseByUser = function (userId) {
  if (!this.isValid()) return false;

  const userCoupon = this.assignedUsers.find(
    u => u.userId.toString() === userId.toString()
  );

  if (userCoupon && userCoupon.used) return false;
  return true;
};

module.exports = mongoose.model('Coupon', couponSchema);
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['fixed', 'percent']
  },
  discount: {
    type: Number,
    required: true,
    min: 0
  },
  minPurchase: {
    type: Number,
    default: 0,
    min: 0
  },
  maxDiscount: {
    type: Number,
    min: 0
  },
  expiryDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: null
  },
  usageCount: {
    type: Number,
    default: 0
  },
  // 사용자별 쿠폰 할당
  assignedUsers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    used: {
      type: Boolean,
      default: false
    },
    usedAt: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 쿠폰 유효성 검증 메서드
couponSchema.methods.isValid = function () {
  if (!this.isActive) return false;
  if (new Date() > this.expiryDate) return false;
  if (this.usageLimit && this.usageCount >= this.usageLimit) return false;
  return true;
};

// 사용자별 쿠폰 사용 가능 여부 확인
couponSchema.methods.canUseByUser = function (userId) {
  if (!this.isValid()) return false;

  const userCoupon = this.assignedUsers.find(
    u => u.userId.toString() === userId.toString()
  );

  if (userCoupon && userCoupon.used) return false;
  return true;
};

module.exports = mongoose.model('Coupon', couponSchema);
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['fixed', 'percent']
  },
  discount: {
    type: Number,
    required: true,
    min: 0
  },
  minPurchase: {
    type: Number,
    default: 0,
    min: 0
  },
  maxDiscount: {
    type: Number,
    min: 0
  },
  expiryDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: null
  },
  usageCount: {
    type: Number,
    default: 0
  },
  // 사용자별 쿠폰 할당
  assignedUsers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    used: {
      type: Boolean,
      default: false
    },
    usedAt: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 쿠폰 유효성 검증 메서드
couponSchema.methods.isValid = function () {
  if (!this.isActive) return false;
  if (new Date() > this.expiryDate) return false;
  if (this.usageLimit && this.usageCount >= this.usageLimit) return false;
  return true;
};

// 사용자별 쿠폰 사용 가능 여부 확인
couponSchema.methods.canUseByUser = function (userId) {
  if (!this.isValid()) return false;

  const userCoupon = this.assignedUsers.find(
    u => u.userId.toString() === userId.toString()
  );

  if (userCoupon && userCoupon.used) return false;
  return true;
};

module.exports = mongoose.model('Coupon', couponSchema);
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['fixed', 'percent']
  },
  discount: {
    type: Number,
    required: true,
    min: 0
  },
  minPurchase: {
    type: Number,
    default: 0,
    min: 0
  },
  maxDiscount: {
    type: Number,
    min: 0
  },
  expiryDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: null
  },
  usageCount: {
    type: Number,
    default: 0
  },
  // 사용자별 쿠폰 할당
  assignedUsers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    used: {
      type: Boolean,
      default: false
    },
    usedAt: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 쿠폰 유효성 검증 메서드
couponSchema.methods.isValid = function () {
  if (!this.isActive) return false;
  if (new Date() > this.expiryDate) return false;
  if (this.usageLimit && this.usageCount >= this.usageLimit) return false;
  return true;
};

// 사용자별 쿠폰 사용 가능 여부 확인
couponSchema.methods.canUseByUser = function (userId) {
  if (!this.isValid()) return false;

  const userCoupon = this.assignedUsers.find(
    u => u.userId.toString() === userId.toString()
  );

  if (userCoupon && userCoupon.used) return false;
  return true;
};

module.exports = mongoose.model('Coupon', couponSchema);
