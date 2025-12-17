const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { authenticateToken } = require('../middleware/auth');

// 상품의 모든 리뷰 조회
router.get('/product/:productId', async (req, res) => {
  try {
    const { filter } = req.query;
    let query = { productId: req.params.productId };

    // 필터링
    if (filter === 'photo') {
      query['images.0'] = { $exists: true };
    } else if (filter === 'high-rating') {
      query.rating = { $gte: 4 };
    }

    const reviews = await Review.find(query)
      .populate('userId', 'username name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: '리뷰 조회 중 오류가 발생했습니다.' });
  }
});

// 리뷰 작성
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { productId, rating, title, content, images, fitFeedback } = req.body;

    // 중복 리뷰 체크 (같은 사용자가 같은 상품에 대한 리뷰)
    const existingReview = await Review.findOne({
      productId,
      userId: req.user.userId
    });

    if (existingReview) {
      return res.status(400).json({ error: '이미 이 상품에 대한 리뷰를 작성하셨습니다.' });
    }

    const review = new Review({
      productId,
      userId: req.user.userId,
      rating,
      title,
      content,
      images: images || [],
      fitFeedback
    });

    await review.save();

    res.status(201).json({
      message: '리뷰가 작성되었습니다.',
      review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: '리뷰 작성 중 오류가 발생했습니다.' });
  }
});

// 리뷰 수정
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { rating, title, content, images } = req.body;

    const review = await Review.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!review) {
      return res.status(404).json({ error: '리뷰를 찾을 수 없거나 수정 권한이 없습니다.' });
    }

    if (rating) review.rating = rating;
    if (title) review.title = title;
    if (content) review.content = content;
    if (images !== undefined) review.images = images;

    await review.save();

    res.json({ message: '리뷰가 수정되었습니다.', review });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ error: '리뷰 수정 중 오류가 발생했습니다.' });
  }
});

// 리뷰 삭제
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!review) {
      return res.status(404).json({ error: '리뷰를 찾을 수 없거나 삭제 권한이 없습니다.' });
    }

    await review.remove();

    res.json({ message: '리뷰가 삭제되었습니다.' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: '리뷰 삭제 중 오류가 발생했습니다.' });
  }
});

// 리뷰 도움됨 증가
router.post('/:id/helpful', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpfulCount: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
    }

    res.json({ message: '도움됨이 추가되었습니다.', helpfulCount: review.helpfulCount });
  } catch (error) {
    console.error('Add helpful error:', error);
    res.status(500).json({ error: '도움됨 추가 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
