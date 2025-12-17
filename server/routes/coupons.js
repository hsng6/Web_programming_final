const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const { authenticateToken } = require('../middleware/auth');

// 사용자의 모든 쿠폰 조회
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const coupons = await Coupon.find({
      'assignedUsers.userId': req.params.userId
    });

    // 사용자별 쿠폰 상태 포함
    const userCoupons = coupons.map(coupon => {
      const userCoupon = coupon.assignedUsers.find(
        u => u.userId.toString() === req.params.userId
      );

      return {
        _id: coupon._id,
        code: coupon.code,
        name: coupon.name,
        type: coupon.type,
        discount: coupon.discount,
        minPurchase: coupon.minPurchase,
        expiryDate: coupon.expiryDate,
        used: userCoupon?.used || false,
        usedAt: userCoupon?.usedAt
      };
    });

    res.json(userCoupons);
  } catch (error) {
    console.error('Get user coupons error:', error);
    res.status(500).json({ error: '쿠폰 조회 중 오류가 발생했습니다.' });
  }
});

// 쿠폰 코드로 조회
router.get('/code/:code', async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ error: '쿠폰을 찾을 수 없습니다.' });
    }

    if (!coupon.isValid()) {
      return res.status(400).json({ error: '사용할 수 없는 쿠폰입니다.' });
    }

    res.json(coupon);
  } catch (error) {
    console.error('Get coupon error:', error);
    res.status(500).json({ error: '쿠폰 조회 중 오류가 발생했습니다.' });
  }
});

// 쿠폰 등록 (사용자에게 할당)
router.post('/register', authenticateToken, async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.userId;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ error: '유효하지 않은 쿠폰 코드입니다.' });
    }

    if (!coupon.isValid()) {
      return res.status(400).json({ error: '만료되었거나 사용할 수 없는 쿠폰입니다.' });
    }

    // 이미 등록된 쿠폰인지 확인
    const alreadyAssigned = coupon.assignedUsers.some(
      u => u.userId.toString() === userId
    );

    if (alreadyAssigned) {
      return res.status(400).json({ error: '이미 등록된 쿠폰입니다.' });
    }

    // 쿠폰 할당
    coupon.assignedUsers.push({ userId });
    await coupon.save();

    res.json({
      message: '쿠폰이 등록되었습니다.',
      coupon: {
        code: coupon.code,
        name: coupon.name,
        type: coupon.type,
        discount: coupon.discount,
        minPurchase: coupon.minPurchase,
        expiryDate: coupon.expiryDate
      }
    });
  } catch (error) {
    console.error('Register coupon error:', error);
    res.status(500).json({ error: '쿠폰 등록 중 오류가 발생했습니다.' });
  }
});

// 쿠폰 사용 (주문 시)
router.post('/use', authenticateToken, async (req, res) => {
  try {
    const { code, orderTotal } = req.body;
    const userId = req.user.userId;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ error: '쿠폰을 찾을 수 없습니다.' });
    }

    if (!coupon.canUseByUser(userId)) {
      return res.status(400).json({ error: '사용할 수 없는 쿠폰입니다.' });
    }

    if (orderTotal < coupon.minPurchase) {
      return res.status(400).json({
        error: `최소 구매 금액 ${coupon.minPurchase.toLocaleString()}원 이상이어야 합니다.`
      });
    }

    // 할인 금액 계산
    let discountAmount = 0;
    if (coupon.type === 'fixed') {
      discountAmount = coupon.discount;
    } else if (coupon.type === 'percent') {
      discountAmount = Math.floor(orderTotal * (coupon.discount / 100));
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
    }

    // 쿠폰 사용 처리
    const userCoupon = coupon.assignedUsers.find(
      u => u.userId.toString() === userId
    );
    userCoupon.used = true;
    userCoupon.usedAt = new Date();
    coupon.usageCount += 1;

    await coupon.save();

    res.json({
      message: '쿠폰이 적용되었습니다.',
      discountAmount,
      finalTotal: orderTotal - discountAmount
    });
  } catch (error) {
    console.error('Use coupon error:', error);
    res.status(500).json({ error: '쿠폰 사용 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
