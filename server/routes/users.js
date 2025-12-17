const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// 사용자 정보 조회
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: '사용자 조회 중 오류가 발생했습니다.' });
  }
});

// 사용자 정보 수정
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, phone, address, birthdate, gender } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, address, birthdate, gender },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    res.json({ message: '사용자 정보가 업데이트되었습니다.', user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: '사용자 정보 수정 중 오류가 발생했습니다.' });
  }
});

// AI 핏 정보 저장/수정
router.patch('/:id/ai-fit', authenticateToken, async (req, res) => {
  try {
    const { height, weight, bodyType, preferredFit, measurements } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        aiFit: {
          height,
          weight,
          bodyType,
          preferredFit,
          measurements
        }
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    res.json({ message: 'AI 핏 정보가 저장되었습니다.', aiFit: user.aiFit });
  } catch (error) {
    console.error('Update AI fit error:', error);
    res.status(500).json({ error: 'AI 핏 정보 저장 중 오류가 발생했습니다.' });
  }
});

// 찜 목록 추가
router.post('/:id/wishlist/:productId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    if (!user.wishlist.includes(req.params.productId)) {
      user.wishlist.push(req.params.productId);
      await user.save();
    }

    res.json({ message: '찜 목록에 추가되었습니다.', wishlist: user.wishlist });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ error: '찜 목록 추가 중 오류가 발생했습니다.' });
  }
});

// 찜 목록 제거
router.delete('/:id/wishlist/:productId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    user.wishlist = user.wishlist.filter(
      id => id.toString() !== req.params.productId
    );
    await user.save();

    res.json({ message: '찜 목록에서 제거되었습니다.', wishlist: user.wishlist });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ error: '찜 목록 제거 중 오류가 발생했습니다.' });
  }
});

// 조회 히스토리 추가
router.post('/:id/view-history/:productId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    user.viewHistory.push({
      productId: req.params.productId,
      viewedAt: new Date()
    });

    // 최근 50개만 유지
    if (user.viewHistory.length > 50) {
      user.viewHistory = user.viewHistory.slice(-50);
    }

    await user.save();
    res.json({ message: '조회 히스토리가 저장되었습니다.' });
  } catch (error) {
    console.error('Add view history error:', error);
    res.status(500).json({ error: '조회 히스토리 저장 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
