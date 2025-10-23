# 인숖 쇼핑몰 🛍️

AI 기반 맞춤형 패션 쇼핑몰 웹사이트입니다.

## 📁 프로젝트 구조

```
쇼핑 사이트/
├── images/              # 상품 이미지 폴더
├── index.html          # 메인 페이지
├── product.html        # 상품 상세 페이지
├── cart.html           # 장바구니 페이지
├── payment.html        # 결제 페이지
├── mypage.html         # 마이페이지
├── orders.html         # 주문내역 페이지
├── support.html        # 고객센터 페이지
├── wishlist.html       # 찜 목록 페이지
├── ai-fit.html         # 🤖 AI 핏 분석 페이지 (NEW!)
├── main.js             # 메인 JavaScript 파일
└── style.css           # 스타일시트
```

## 🖼️ 이미지 추가 방법

### 1. images 폴더에 이미지 파일 저장

아래 파일명으로 이미지를 `images/` 폴더에 저장하세요:

#### TOPS (상의) - 10개
- `white-tshirt.jpg` - 화이트 티셔츠
- `black-tshirt.jpg` - 블랙 티셔츠
- `stripe-shirt.jpg` - 스트라이프 셔츠
- `knit.jpg` - 니트
- `overfit-hoodie.jpg` - 오버핏 후드티
- `crop-tshirt.jpg` - 크롭 티셔츠
- `linen-shirt.jpg` - 린넨 셔츠
- `sweatshirt.jpg` - 맨투맨
- `polo-shirt.jpg` - 폴로 셔츠
- `cardigan.jpg` - 카디건

#### PANTS (바지) - 10개
- `black-jeans.jpg` - 블랙 청바지
- `blue-jeans.jpg` - 블루 청바지
- `slacks.jpg` - 슬랙스
- `jogger-pants.jpg` - 조거 팬츠
- `wide-pants.jpg` - 와이드 팬츠
- `cargo-pants.jpg` - 카고 팬츠
- `chino-pants.jpg` - 치노 팬츠
- `shorts.jpg` - 반바지
- `training-pants.jpg` - 트레이닝 팬츠
- `skinny-jeans.jpg` - 스키니 진

#### OUTER (아우터) - 10개
- `denim-jacket.jpg` - 데님 자켓
- `leather-jacket.jpg` - 가죽 자켓
- `padding.jpg` - 패딩
- `coat.jpg` - 코트
- `blazer.jpg` - 블레이저
- `trench-coat.jpg` - 트렌치 코트
- `hood-zipup.jpg` - 후드 집업
- `windbreaker.jpg` - 바람막이
- `long-padding.jpg` - 롱 패딩
- `fleece-jacket.jpg` - 플리스 자켓

#### SHOES (신발) - 10개
- `white-sneakers.jpg` - 화이트 스니커즈
- `black-sneakers.jpg` - 블랙 스니커즈
- `loafer.jpg` - 로퍼
- `boots.jpg` - 부츠
- `running-shoes.jpg` - 러닝화
- `slippers.jpg` - 슬리퍼
- `sandals.jpg` - 샌들
- `dress-shoes.jpg` - 구두
- `hightop-sneakers.jpg` - 하이탑 스니커즈
- `walker.jpg` - 워커

### 2. 이미지 파일 규격 권장사항

- **크기**: 500x500px ~ 800x800px
- **형식**: JPG, PNG, WebP
- **용량**: 100KB ~ 500KB (웹 최적화)
- **비율**: 정사각형 (1:1)

### 3. 이미지 최적화 팁

- **온라인 도구 사용**: TinyPNG, Squoosh 등으로 용량 압축
- **일관된 크기**: 모든 상품 이미지를 같은 크기로 유지
- **배경**: 흰색 또는 투명 배경 권장

## ✨ 주요 기능

- ✅ 상품 카테고리별 필터링 (TOPS, PANTS, OUTER, SHOES)
- ✅ 상품 검색 (띄어쓰기 무관)
- ✅ 장바구니 기능 (수량 조절, 삭제)
- ✅ 상품 리뷰 시스템 (작성, 수정, 삭제)
- ✅ 결제 및 주문 관리
- ✅ 마이페이지 (회원 정보, 통계)
- ✅ 주문내역 조회 (상태별 필터)
- ✅ 고객센터 (FAQ, 1:1 문의)
- ✅ 반응형 디자인 (모바일 지원)
- ✅ 성능 최적화 (Lazy Loading, Debouncing)
- 🤖 **AI 스마트 핏 분석 시스템** (NEW! - 업계 최초)
  - 신체 조건 입력 (키, 체중, 가슴/허리/엉덩이둘레 등)
  - BMI 자동 계산 및 체형 분석
  - 카테고리별 맞춤 사이즈 추천 (상의/하의/아우터/신발)
  - 세부 치수 가이드 제공 (가슴둘레, 어깨너비, 소매길이 등)
  - AI 기반 스타일링 조언
  - 체형에 맞는 상품 자동 추천
  - 프로필 저장 기능으로 재사용 가능

## 🚀 실행 방법

1. `index.html` 파일을 더블클릭하거나
2. 브라우저에서 파일을 직접 열기
3. 또는 Live Server 확장 프로그램 사용 (VS Code)

## 💾 데이터 저장

모든 데이터는 브라우저의 **LocalStorage**에 저장됩니다:
- 장바구니 항목
- 상품 리뷰
- 주문 내역
- 회원 정보
- 고객 문의

## 📱 지원 브라우저

- Chrome (권장)
- Firefox
- Safari
- Edge

## 🔧 커스터마이징

### 새로운 상품 추가

`main.js` 파일의 `PRODUCTS` 배열에 추가:

```javascript
{ 
    id: 41,                           // 고유 ID
    name: "새 상품 이름", 
    price: 50000, 
    image: "images/new-product.jpg",  // 이미지 경로
    category: "TOPS"                   // 카테고리
}
```

### 색상 변경

`style.css` 파일에서 메인 색상 변경:
```css
header {
    background-color: #333;  /* 헤더 색상 */
}
```

## 📝 참고사항

- 이미지가 없으면 깨진 이미지로 표시됩니다
- 실제 이미지를 추가하기 전까지는 placeholder가 아닌 로컬 경로로 설정되어 있습니다
- 이미지 파일명이 정확히 일치해야 합니다 (대소문자 구분)

## 👨‍💻 개발 정보

- **제작**: 2025
- **기술 스택**: HTML5, CSS3, Vanilla JavaScript
- **데이터베이스**: LocalStorage
- **디자인**: 현대적인 이커머스 UI/UX 참고

---

궁금한 점이 있으시면 고객센터를 이용해주세요! 😊
