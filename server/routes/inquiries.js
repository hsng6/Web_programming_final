const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { authenticateToken } = require('../middleware/auth');

// 사용자의 모든 문의 조회
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(inquiries);
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ error: '문의 조회 중 오류가 발생했습니다.' });
  }
});

// 문의 작성
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { type, subject, message } = req.body;

    const inquiry = new Inquiry({
      userId: req.user.userId,
      type,
      subject,
      message,
      status: 'pending'
    });

    await inquiry.save();

    res.status(201).json({
      message: '문의가 등록되었습니다.',
      inquiry
    });
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({ error: '문의 등록 중 오류가 발생했습니다.' });
  }
});

// 문의 답변 (관리자)
router.patch('/:id/respond', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      {
        status: 'answered',
        response: {
          message,
          respondedAt: new Date(),
          respondedBy: req.user.userId
        }
      },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ error: '문의를 찾을 수 없습니다.' });
    }

    res.json({ message: '답변이 등록되었습니다.', inquiry });
  } catch (error) {
    console.error('Respond to inquiry error:', error);
    res.status(500).json({ error: '답변 등록 중 오류가 발생했습니다.' });
  }
});

// 문의 삭제
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const inquiry = await Inquiry.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!inquiry) {
      return res.status(404).json({ error: '문의를 찾을 수 없거나 삭제 권한이 없습니다.' });
    }

    await inquiry.remove();

    res.json({ message: '문의가 삭제되었습니다.' });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({ error: '문의 삭제 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
