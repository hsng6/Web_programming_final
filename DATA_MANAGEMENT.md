# 인숖 쇼핑몰 - 데이터 관리 가이드

## 개요
이 프로젝트는 LocalStorage 기반에서 서버 기반 데이터베이스로 업그레이드되었습니다.

## 아키텍처

### 백엔드 (server/)
- **기술 스택**: Node.js + Express + MongoDB
- **인증**: JWT (JSON Web Token)
- **데이터베이스**: MongoDB (Mongoose ODM)

### 프론트엔드
- **기술 스택**: HTML5 + CSS3 + Vanilla JavaScript
- **데이터 관리**: API 연동 + LocalStorage 캐싱
- **인증**: JWT 토큰 저장 및 전송

## 설정 방법

### 1. MongoDB 설치
```bash
# Windows
https://www.mongodb.com/try/download/community 에서 다운로드 및 설치

# MongoDB 서비스 시작
net start MongoDB
```

### 2. 백엔드 서버 설정
```bash
cd server

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일 편집하여 MongoDB URI와 JWT Secret 설정

# 데이터베이스 초기화
npm run init-db

# 서버 실행
npm run dev
```

### 3. 프론트엔드 연동
프론트엔드 HTML 파일에 `api-client.js`를 포함하세요:
```html
<script src="api-client.js"></script>
```

## API 사용 예시

### 회원가입
```javascript
const userData = {
  username: 'user123',
  email: 'user@example.com',
  password: 'password123',
  name: '홍길동'
};

authAPI.register(userData)
  .then(response => {
    console.log('회원가입 성공:', response);
    // 자동으로 토큰이 localStorage에 저장됨
  })
  .catch(error => {
    console.error('회원가입 실패:', error);
  });
```

### 로그인
```javascript
authAPI.login('user123', 'password123')
  .then(response => {
    console.log('로그인 성공:', response.user);
    // 토큰과 사용자 정보가 localStorage에 저장됨
  })
  .catch(error => {
    console.error('로그인 실패:', error);
  });
```

### 상품 조회
```javascript
// 모든 상품
productsAPI.getAll({ category: 'TOPS', sort: 'price-low' })
  .then(products => console.log(products));

// 특정 상품
productsAPI.getById('product-id')
  .then(product => console.log(product));
```

### 주문 생성
```javascript
const orderData = {
  orderId: 'ORD-' + Date.now(),
  items: [
    { productId: '...', name: '티셔츠', price: 19900, size: 'M', quantity: 1 }
  ],
  subtotal: 19900,
  shipping: 3000,
  total: 22900,
  paymentMethod: '카드',
  recipient: {
    name: '홍길동',
    phone: '010-1234-5678',
    address: '서울시 강남구...'
  }
};

ordersAPI.create(orderData)
  .then(response => console.log('주문 완료:', response));
```

### 리뷰 작성
```javascript
const reviewData = {
  productId: 'product-id',
  rating: 5,
  title: '정말 좋아요!',
  content: '사이즈도 딱 맞고 품질이 훌륭합니다.',
  images: ['base64-image-1', 'base64-image-2']
};

reviewsAPI.create(reviewData)
  .then(response => console.log('리뷰 작성 완료:', response));
```

### 쿠폰 등록 및 사용
```javascript
// 쿠폰 등록
couponsAPI.register('WELCOME2025')
  .then(response => console.log('쿠폰 등록:', response));

// 쿠폰 사용
couponsAPI.use('WELCOME2025', 50000)
  .then(response => {
    console.log('할인 금액:', response.discountAmount);
    console.log('최종 결제 금액:', response.finalTotal);
  });
```

## 데이터 마이그레이션

기존 LocalStorage 데이터를 서버로 마이그레이션하려면:

```javascript
// 로그인 후 실행
syncHelper.migrateToServer()
  .then(() => console.log('마이그레이션 완료'));

// 서버 데이터를 LocalStorage로 동기화 (오프라인 지원)
syncHelper.syncFromServer()
  .then(() => console.log('동기화 완료'));
```

## 하이브리드 모드 (LocalStorage + API)

서버가 실행 중이 아닐 때도 동작하도록 LocalStorage 폴백 지원:

```javascript
async function getProducts() {
  try {
    // 먼저 서버에서 데이터 가져오기 시도
    const products = await productsAPI.getAll();
    // 성공 시 LocalStorage에 캐시
    localStorage.setItem('productsCache', JSON.stringify(products));
    return products;
  } catch (error) {
    // 서버 오류 시 LocalStorage 캐시 사용
    console.warn('서버 연결 실패, 캐시 데이터 사용');
    const cache = localStorage.getItem('productsCache');
    return cache ? JSON.parse(cache) : PRODUCTS; // 기본 상품 데이터
  }
}
```

## 보안 고려사항

1. **JWT 토큰 관리**
   - 토큰은 localStorage에 저장
   - 만료 시간: 7일
   - 매 API 요청 시 `Authorization: Bearer <token>` 헤더로 전송

2. **비밀번호 암호화**
   - bcryptjs를 사용한 해시화
   - 최소 6자 이상 요구

3. **입력 검증**
   - express-validator로 서버 측 검증
   - 프론트엔드에서도 기본 검증 수행

## 에러 처리

```javascript
try {
  const data = await api.get('/some-endpoint');
  // 성공 처리
} catch (error) {
  if (error.message.includes('401')) {
    // 인증 만료 - 재로그인 필요
    alert('세션이 만료되었습니다. 다시 로그인해주세요.');
    authAPI.logout();
    window.location.href = 'login.html';
  } else {
    // 기타 오류
    alert('오류가 발생했습니다: ' + error.message);
  }
}
```

## 성능 최적화

1. **캐싱 전략**
   - 상품 목록: LocalStorage에 캐싱 (5분 유효)
   - 사용자 정보: 세션 중 메모리 캐싱
   
2. **지연 로딩**
   - 이미지는 필요할 때만 로드
   - 무한 스크롤 지원 (다음 단계)

3. **요청 최적화**
   - 필요한 필드만 조회 (select)
   - 페이지네이션 적용

## 다음 단계

1. **이미지 업로드**
   - Multer를 사용한 실제 이미지 업로드
   - AWS S3 또는 클라우드 스토리지 연동

2. **실시간 알림**
   - Socket.io를 사용한 주문 상태 실시간 업데이트

3. **관리자 페이지**
   - 상품 관리
   - 주문 관리
   - 통계 대시보드
