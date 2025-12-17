const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 모든 상품 조회
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, brand, color, sort } = req.query;

    let query = {};

    // 필터링
    if (category && category !== 'ALL') {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    if (brand) {
      const brands = Array.isArray(brand) ? brand : [brand];
      query.brand = { $in: brands };
    }
    if (color) {
      const colors = Array.isArray(color) ? color : [color];
      query.colors = { $in: colors };
    }

    // 정렬
    let sortOption = {};
    switch (sort) {
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      case 'popular':
        sortOption = { sales: -1, views: -1 };
        break;
      case 'rating':
        sortOption = { averageRating: -1, reviewCount: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const products = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: '상품 조회 중 오류가 발생했습니다.' });
  }
});

// 특정 상품 조회
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
    }

    // 조회수 증가
    product.views += 1;
    await product.save();

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: '상품 조회 중 오류가 발생했습니다.' });
  }
});

// 재고 업데이트
router.patch('/:id/stock', async (req, res) => {
  try {
    const { size, quantity } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
    }

    if (!product.stock[size] === undefined) {
      return res.status(400).json({ error: '잘못된 사이즈입니다.' });
    }

    product.stock[size] = Math.max(0, product.stock[size] - quantity);
    await product.save();

    res.json({
      message: '재고가 업데이트되었습니다.',
      stock: product.stock
    });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({ error: '재고 업데이트 중 오류가 발생했습니다.' });
  }
});

// 추천 상품 (인기순)
router.get('/recommendations/trending', async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ views: -1, sales: -1 })
      .limit(4);
    res.json(products);
  } catch (error) {
    console.error('Get trending error:', error);
    res.status(500).json({ error: '추천 상품 조회 중 오류가 발생했습니다.' });
  }
});

// 신상품
router.get('/recommendations/new', async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(4);
    res.json(products);
  } catch (error) {
    console.error('Get new products error:', error);
    res.status(500).json({ error: '신상품 조회 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
