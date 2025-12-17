const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');

// 주문 생성
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { orderId, items, subtotal, shipping, discount, couponCode, total, paymentMethod, recipient } = req.body;

    // 재고 확인 및 차감
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `상품을 찾을 수 없습니다: ${item.name}` });
      }

      if (product.stock[item.size] < item.quantity) {
        return res.status(400).json({ error: `재고가 부족합니다: ${item.name} (${item.size})` });
      }

      // 재고 차감
      product.stock[item.size] -= item.quantity;
      product.sales += item.quantity;
      await product.save();
    }

    // 주문 생성
    const order = new Order({
      orderId,
      userId: req.user.userId,
      items,
      subtotal,
      shipping: { amount: shipping },
      discount,
      couponCode,
      total,
      paymentMethod,
      recipient,
      status: '결제완료'
    });

    await order.save();

    res.status(201).json({
      message: '주문이 생성되었습니다.',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: '주문 생성 중 오류가 발생했습니다.' });
  }
});

// 사용자의 모든 주문 조회
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('items.productId', 'name image');

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: '주문 조회 중 오류가 발생했습니다.' });
  }
});

// 특정 주문 조회
router.get('/:orderId', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })
      .populate('items.productId', 'name image category');

    if (!order) {
      return res.status(404).json({ error: '주문을 찾을 수 없습니다.' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: '주문 조회 중 오류가 발생했습니다.' });
  }
});

// 주문 상태 업데이트
router.patch('/:orderId/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: '주문을 찾을 수 없습니다.' });
    }

    res.json({ message: '주문 상태가 업데이트되었습니다.', order });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: '주문 상태 업데이트 중 오류가 발생했습니다.' });
  }
});

// 배송 추적 정보 업데이트
router.patch('/:orderId/shipping', authenticateToken, async (req, res) => {
  try {
    const { courier, trackingNumber, timeline } = req.body;

    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ error: '주문을 찾을 수 없습니다.' });
    }

    if (courier) order.shipping.courier = courier;
    if (trackingNumber) order.shipping.trackingNumber = trackingNumber;
    if (timeline) order.shipping.timeline = timeline;

    await order.save();

    res.json({ message: '배송 정보가 업데이트되었습니다.', shipping: order.shipping });
  } catch (error) {
    console.error('Update shipping error:', error);
    res.status(500).json({ error: '배송 정보 업데이트 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
