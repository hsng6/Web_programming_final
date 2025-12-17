require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Coupon = require('./models/Coupon');

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/insook-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch(err => {
    console.error('❌ MongoDB 연결 실패:', err);
    process.exit(1);
  });

// 초기 상품 데이터
const initialProducts = [
  {
    name: '베이직 화이트 티셔츠',
    category: 'TOPS',
    price: 19900,
    brand: 'BasicWear',
    colors: ['화이트', '블랙', '그레이'],
    image: 'https://via.placeholder.com/300x400?text=White+Tee',
    description: '깔끔한 디자인의 베이직 화이트 티셔츠',
    stock: { S: 10, M: 15, L: 20, XL: 10, FREE: 0 },
    fitInfo: {
      recommendedHeight: { min: 160, max: 180 },
      recommendedWeight: { min: 50, max: 75 },
      fitType: '레귤러',
      stretchability: '보통'
    }
  },
  {
    name: '슬림핏 블랙 진',
    category: 'PANTS',
    price: 45000,
    brand: 'DenimCo',
    colors: ['블랙', '네이비'],
    image: 'https://via.placeholder.com/300x400?text=Black+Jeans',
    description: '슬림한 실루엣의 블랙 데님 팬츠',
    stock: { S: 5, M: 10, L: 15, XL: 8, FREE: 0 },
    fitInfo: {
      recommendedHeight: { min: 165, max: 185 },
      recommendedWeight: { min: 55, max: 80 },
      fitType: '슬림',
      stretchability: '약간'
    }
  },
  {
    name: '캐주얼 후드 집업',
    category: 'OUTER',
    price: 59000,
    brand: 'StreetStyle',
    colors: ['그레이', '블랙', '네이비'],
    image: 'https://via.placeholder.com/300x400?text=Hoodie',
    description: '편안한 착용감의 후드 집업',
    stock: { S: 8, M: 12, L: 15, XL: 10, FREE: 0 },
    fitInfo: {
      recommendedHeight: { min: 160, max: 185 },
      recommendedWeight: { min: 50, max: 85 },
      fitType: '오버핏',
      stretchability: '보통'
    }
  },
  {
    name: '클래식 화이트 스니커즈',
    category: 'SHOES',
    price: 79000,
    brand: 'SneakerLab',
    colors: ['화이트', '블랙'],
    image: 'https://via.placeholder.com/300x400?text=White+Sneakers',
    description: '어디에나 매치하기 좋은 화이트 스니커즈',
    stock: { S: 0, M: 0, L: 0, XL: 0, FREE: 20 },
    fitInfo: {
      fitType: '레귤러',
      stretchability: '없음'
    }
  }
];

// 초기 쿠폰 데이터
const initialCoupons = [
  {
    code: 'WELCOME2025',
    name: '신규 회원 환영 쿠폰',
    type: 'fixed',
    discount: 5000,
    minPurchase: 30000,
    expiryDate: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'WINTER20',
    name: '겨울 시즌 20% 할인',
    type: 'percent',
    discount: 20,
    minPurchase: 50000,
    maxDiscount: 20000,
    expiryDate: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'FIRSTBUY',
    name: '첫 구매 감사 쿠폰',
    type: 'fixed',
    discount: 10000,
    minPurchase: 50000,
    expiryDate: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'SPECIAL50',
    name: '특별 할인 50% 쿠폰',
    type: 'percent',
    discount: 50,
    minPurchase: 100000,
    maxDiscount: 50000,
    expiryDate: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'VIP10000',
    name: 'VIP 고객 전용 쿠폰',
    type: 'fixed',
    discount: 10000,
    minPurchase: 50000,
    expiryDate: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'FREESHIP',
    name: '무료 배송 쿠폰',
    type: 'fixed',
    discount: 3000,
    minPurchase: 0,
    expiryDate: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'SURPRISE30',
    name: '깜짝 30% 할인',
    type: 'percent',
    discount: 30,
    minPurchase: 70000,
    maxDiscount: 30000,
    expiryDate: new Date('2025-12-31'),
    isActive: true
  }
];

async function initializeDatabase() {
  try {
    console.log('🔄 데이터베이스 초기화 시작...');

    // 기존 데이터 삭제
    await Product.deleteMany({});
    await Coupon.deleteMany({});
    console.log('✅ 기존 데이터 삭제 완료');

    // 상품 데이터 삽입
    await Product.insertMany(initialProducts);
    console.log(`✅ ${initialProducts.length}개의 상품 데이터 삽입 완료`);

    // 쿠폰 데이터 삽입
    await Coupon.insertMany(initialCoupons);
    console.log(`✅ ${initialCoupons.length}개의 쿠폰 데이터 삽입 완료`);

    console.log('🎉 데이터베이스 초기화 완료!');

    // 연결 종료
    await mongoose.connection.close();
    console.log('📴 MongoDB 연결 종료');

    process.exit(0);
  } catch (error) {
    console.error('❌ 초기화 중 오류 발생:', error);
    process.exit(1);
  }
}

initializeDatabase();
