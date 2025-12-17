const PRODUCTS = [
    // TOPS
    { id: 1, name: "화이트 티셔츠", price: 25000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop", category: "TOPS", brand: "BasicWear", colors: ["화이트", "아이보리"], stock: { "화이트": { S: 12, M: 18, L: 15, XL: 10 }, "아이보리": { S: 8, M: 12, L: 9, XL: 5 } } },
    { id: 2, name: "블랙 티셔츠", price: 25000, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop", category: "TOPS", brand: "BasicWear", colors: ["블랙", "네이비"], stock: { "블랙": { S: 10, M: 22, L: 18, XL: 7 }, "네이비": { S: 6, M: 18, L: 12, XL: 3 } } },
    { id: 3, name: "스트라이프 셔츠", price: 35000, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop", category: "TOPS", brand: "ClassicLine", colors: ["화이트", "블루"], stock: { "화이트": { S: 6, M: 12, L: 10, XL: 4 }, "블루": { S: 4, M: 8, L: 6, XL: 2 } } },
    { id: 4, name: "니트", price: 45000, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop", category: "TOPS", brand: "Cozy", colors: ["베이지", "그레이", "블랙"], stock: { "베이지": { S: 15, M: 20, L: 16, XL: 8 }, "그레이": { S: 10, M: 16, L: 12, XL: 5 }, "블랙": { S: 8, M: 14, L: 11, XL: 4 } } },
    { id: 17, name: "오버핏 후드티", price: 38000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop", category: "TOPS", brand: "StreetStyle", colors: ["그레이", "블랙"], stock: { "그레이": { S: 2, M: 7, L: 12, XL: 9 }, "블랙": { S: 0, M: 3, L: 8, XL: 5 } } },
    { id: 18, name: "크롭 티셔츠", price: 22000, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop", category: "TOPS", brand: "TrendyFit", colors: ["화이트", "핑크", "블랙"], stock: { "화이트": { S: 18, M: 15, L: 10, XL: 3 }, "핑크": { S: 12, M: 9, L: 6, XL: 1 }, "블랙": { S: 10, M: 8, L: 5, XL: 0 } } },
    { id: 19, name: "린넨 셔츠", price: 42000, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop", category: "TOPS", brand: "SummerBreeze", colors: ["베이지", "화이트"], stock: { "베이지": { S: 8, M: 11, L: 13, XL: 5 }, "화이트": { S: 4, M: 7, L: 9, XL: 3 } } },
    { id: 20, name: "맨투맨", price: 35000, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop", category: "TOPS", brand: "BasicWear", colors: ["그레이", "네이비", "블랙"], stock: { "그레이": { S: 12, M: 16, L: 18, XL: 10 }, "네이비": { S: 8, M: 12, L: 14, XL: 6 }, "블랙": { S: 6, M: 10, L: 12, XL: 5 } } },
    { id: 21, name: "폴로 셔츠", price: 48000, image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop", category: "TOPS", brand: "ClassicLine", colors: ["화이트", "네이비", "블랙"], stock: { "화이트": { S: 9, M: 13, L: 11, XL: 6 }, "네이비": { S: 5, M: 9, L: 7, XL: 4 }, "블랙": { S: 4, M: 7, L: 6, XL: 3 } } },
    { id: 22, name: "가디건", price: 52000, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop", category: "TOPS", brand: "Cozy", colors: ["베이지", "그레이"], stock: { "베이지": { S: 5, M: 10, L: 8, XL: 4 }, "그레이": { S: 3, M: 6, L: 4, XL: 2 } } },

    // PANTS
    { id: 5, name: "블랙 청바지", price: 50000, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop", category: "PANTS", brand: "DenimCo", colors: ["블랙"], stock: { "블랙": { S: 12, M: 20, L: 18, XL: 10 } } },
    { id: 6, name: "블루 청바지", price: 50000, image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500&h=600&fit=crop", category: "PANTS", brand: "DenimCo", colors: ["블루", "라이트블루"], stock: { "블루": { S: 18, M: 25, L: 22, XL: 14 }, "라이트블루": { S: 12, M: 19, L: 18, XL: 10 } } },
    { id: 7, name: "슬랙스", price: 60000, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=600&fit=crop", category: "PANTS", brand: "ClassicLine", colors: ["블랙", "네이비", "그레이"], stock: { "블랙": { S: 10, M: 18, L: 15, XL: 8 }, "네이비": { S: 6, M: 12, L: 9, XL: 4 }, "그레이": { S: 5, M: 10, L: 8, XL: 3 } } },
    { id: 8, name: "조거 팬츠", price: 40000, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=600&fit=crop", category: "PANTS", brand: "StreetStyle", colors: ["그레이", "블랙"], stock: { "그레이": { S: 12, M: 20, L: 17, XL: 10 }, "블랙": { S: 8, M: 16, L: 13, XL: 6 } } },
    { id: 23, name: "와이드 팬츠", price: 55000, image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=600&fit=crop", category: "PANTS", brand: "TrendyFit", colors: ["베이지", "블랙"], stock: { "베이지": { S: 8, M: 14, L: 16, XL: 9 }, "블랙": { S: 4, M: 10, L: 12, XL: 5 } } },
    { id: 24, name: "카고 팬츠", price: 58000, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=600&fit=crop", category: "PANTS", brand: "UrbanWear", colors: ["카키", "블랙"], stock: { "카키": { S: 11, M: 18, L: 15, XL: 7 }, "블랙": { S: 7, M: 14, L: 11, XL: 3 } } },
    { id: 25, name: "치노 팬츠", price: 48000, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop", category: "PANTS", brand: "ClassicLine", colors: ["베이지", "네이비"], stock: { "베이지": { S: 13, M: 21, L: 19, XL: 11 }, "네이비": { S: 9, M: 17, L: 15, XL: 7 } } },
    { id: 26, name: "반바지", price: 35000, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop", category: "PANTS", brand: "SummerBreeze", colors: ["베이지", "네이비", "블랙"], stock: { "베이지": { S: 16, M: 22, L: 18, XL: 10 }, "네이비": { S: 12, M: 18, L: 14, XL: 6 }, "블랙": { S: 10, M: 16, L: 12, XL: 5 } } },
    { id: 27, name: "트레이닝 팬츠", price: 42000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop", category: "PANTS", brand: "ActiveLife", colors: ["그레이", "블랙"], stock: { "그레이": { S: 2, M: 12, L: 14, XL: 8 }, "블랙": { S: 0, M: 8, L: 10, XL: 4 } } },
    { id: 28, name: "스키니 진", price: 52000, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop", category: "PANTS", brand: "DenimCo", colors: ["블랙", "블루"], stock: { "블랙": { S: 9, M: 15, L: 13, XL: 5 }, "블루": { S: 5, M: 11, L: 9, XL: 3 } } },

    // OUTER
    { id: 9, name: "데님 자켓", price: 80000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop", category: "OUTER", brand: "DenimCo", colors: ["블루", "블랙"], stock: { "블루": { S: 6, M: 12, L: 10, XL: 5 }, "블랙": { S: 4, M: 8, L: 6, XL: 3 } } },
    { id: 10, name: "가죽 자켓", price: 150000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop", category: "OUTER", brand: "Premium", colors: ["블랙", "브라운"], stock: { "블랙": { S: 4, M: 7, L: 6, XL: 3 }, "브라운": { S: 2, M: 5, L: 4, XL: 1 } } },
    { id: 11, name: "패딩", price: 120000, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&h=600&fit=crop", category: "OUTER", brand: "WinterWarm", colors: ["블랙", "네이비", "베이지"], stock: { "블랙": { S: 10, M: 15, L: 12, XL: 8 }, "네이비": { S: 6, M: 9, L: 8, XL: 4 }, "베이지": { S: 5, M: 8, L: 6, XL: 3 } } },
    { id: 12, name: "코트", price: 180000, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&h=600&fit=crop", category: "OUTER", brand: "Premium", colors: ["블랙", "카멜"], stock: { "블랙": { S: 5, M: 10, L: 8, XL: 4 }, "카멜": { S: 3, M: 6, L: 6, XL: 2 } } },
    { id: 29, name: "블레이저", price: 95000, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=600&fit=crop", category: "OUTER", brand: "ClassicLine", colors: ["블랙", "네이비"], stock: { "블랙": { S: 8, M: 13, L: 11, XL: 6 }, "네이비": { S: 4, M: 9, L: 7, XL: 4 } } },
    { id: 30, name: "트렌치 코트", price: 165000, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&h=600&fit=crop", category: "OUTER", brand: "Premium", colors: ["베이지", "블랙"], stock: { "베이지": { S: 3, M: 6, L: 5, XL: 2 }, "블랙": { S: 1, M: 4, L: 3, XL: 0 } } },
    { id: 31, name: "후드 집업", price: 68000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop", category: "OUTER", brand: "StreetStyle", colors: ["그레이", "블랙", "네이비"], stock: { "그레이": { S: 12, M: 17, L: 14, XL: 9 }, "블랙": { S: 8, M: 13, L: 10, XL: 5 }, "네이비": { S: 6, M: 11, L: 9, XL: 4 } } },
    { id: 32, name: "바람막이", price: 75000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop", category: "OUTER", brand: "ActiveLife", colors: ["블랙", "네이비"], stock: { "블랙": { S: 10, M: 15, L: 13, XL: 8 }, "네이비": { S: 6, M: 11, L: 9, XL: 4 } } },
    { id: 33, name: "롱 패딩", price: 185000, image: "https://images.unsplash.com/photo-1544923246-77ba2772dc27?w=500&h=600&fit=crop", category: "OUTER", brand: "WinterWarm", colors: ["블랙", "네이비"], stock: { "블랙": { S: 4, M: 9, L: 7, XL: 3 }, "네이비": { S: 2, M: 5, L: 5, XL: 1 } } },
    { id: 34, name: "플리스 자켓", price: 62000, image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&h=600&fit=crop", category: "OUTER", brand: "Cozy", colors: ["그레이", "베이지", "블랙"], stock: { "그레이": { S: 11, M: 16, L: 14, XL: 7 }, "베이지": { S: 7, M: 12, L: 10, XL: 4 }, "블랙": { S: 5, M: 9, L: 7, XL: 3 } } },

    // SHOES
    { id: 13, name: "화이트 스니커즈", price: 90000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop", category: "SHOES", brand: "SneakerLab", colors: ["화이트"], stock: { "화이트": { "240": 5, "250": 10, "260": 12, "270": 8, "280": 4 } } },
    { id: 14, name: "블랙 스니커즈", price: 90000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop", category: "SHOES", brand: "SneakerLab", colors: ["블랙"], stock: { "블랙": { "240": 6, "250": 12, "260": 15, "270": 10, "280": 5 } } },
    { id: 15, name: "로퍼", price: 120000, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&h=600&fit=crop", category: "SHOES", brand: "ClassicLine", colors: ["블랙", "브라운"], stock: { "블랙": { "240": 5, "250": 10, "260": 12, "270": 7, "280": 4 }, "브라운": { "240": 3, "250": 6, "260": 8, "270": 5, "280": 2 } } },
    { id: 16, name: "부츠", price: 150000, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&h=600&fit=crop", category: "SHOES", brand: "Premium", colors: ["블랙", "브라운"], stock: { "블랙": { "240": 4, "250": 7, "260": 10, "270": 6, "280": 3 }, "브라운": { "240": 2, "250": 5, "260": 6, "270": 4, "280": 1 } } },
    { id: 35, name: "러닝화", price: 98000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop", category: "SHOES", brand: "ActiveLife", colors: ["화이트", "블랙", "그레이"], stock: { "화이트": { "240": 10, "250": 16, "260": 18, "270": 14, "280": 8 }, "블랙": { "240": 6, "250": 12, "260": 14, "270": 10, "280": 4 }, "그레이": { "240": 5, "250": 10, "260": 12, "270": 8, "280": 3 } } },
    { id: 36, name: "슬리퍼", price: 28000, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=600&fit=crop", category: "SHOES", brand: "ComfortFit", colors: ["블랙", "화이트", "그레이"], stock: { "블랙": { "240": 18, "250": 22, "260": 20, "270": 14, "280": 10 }, "화이트": { "240": 12, "250": 18, "260": 16, "270": 10, "280": 6 }, "그레이": { "240": 10, "250": 15, "260": 13, "270": 9, "280": 5 } } },
    { id: 37, name: "샌들", price: 45000, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=600&fit=crop", category: "SHOES", brand: "SummerBreeze", colors: ["베이지", "블랙"], stock: { "베이지": { "240": 12, "250": 18, "260": 16, "270": 12, "280": 6 }, "블랙": { "240": 8, "250": 14, "260": 12, "270": 8, "280": 4 } } },
    { id: 38, name: "구두", price: 135000, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&h=600&fit=crop", category: "SHOES", brand: "ClassicLine", colors: ["블랙", "브라운"], stock: { "블랙": { "240": 2, "250": 5, "260": 7, "270": 5, "280": 3 }, "브라운": { "240": 0, "250": 3, "260": 5, "270": 3, "280": 1 } } },
    { id: 39, name: "하이탑 스니커즈", price: 105000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop", category: "SHOES", brand: "SneakerLab", colors: ["블랙", "화이트"], stock: { "블랙": { "240": 9, "250": 13, "260": 15, "270": 11, "280": 5 }, "화이트": { "240": 5, "250": 9, "260": 11, "270": 7, "280": 3 } } },
    { id: 40, name: "워커", price: 145000, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&h=600&fit=crop", category: "SHOES", brand: "UrbanWear", colors: ["블랙", "브라운"], stock: { "블랙": { "240": 6, "250": 11, "260": 13, "270": 9, "280": 4 }, "브라운": { "240": 4, "250": 7, "260": 9, "270": 5, "280": 2 } } }
];

// ===== 재고 관리 함수 =====
function getProductStock(productId) {
    const stockData = JSON.parse(localStorage.getItem('productStocks')) || {};
    const product = PRODUCTS.find(p => p.id === productId);

    if (stockData[productId]) {
        // 저장된 재고 데이터의 구조 검증
        const savedStock = stockData[productId];
        const savedFirstKey = Object.keys(savedStock)[0];
        const savedFirstValue = savedStock[savedFirstKey];

        // PRODUCTS의 재고 구조 확인
        if (product && product.stock) {
            const productFirstKey = Object.keys(product.stock)[0];
            const productFirstValue = product.stock[productFirstKey];

            // 둘 다 객체 구조인지 확인
            const savedIsColorBased = typeof savedFirstValue === 'object' && !Array.isArray(savedFirstValue);
            const productIsColorBased = typeof productFirstValue === 'object' && !Array.isArray(productFirstValue);

            // 구조가 다르면 localStorage 전체 초기화
            if (savedIsColorBased !== productIsColorBased) {
                localStorage.removeItem('productStocks');
                return product.stock;
            }
        }

        return savedStock;
    }

    // 초기 재고가 없으면 PRODUCTS의 stock 사용
    return product ? product.stock : {};
}

function updateProductStock(productId, size, quantity, color = null) {
    const stockData = JSON.parse(localStorage.getItem('productStocks')) || {};
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product) {
        return;
    }

    // 저장된 재고 데이터 구조 검증
    if (stockData[productId]) {
        const savedFirstKey = Object.keys(stockData[productId])[0];
        const savedFirstValue = stockData[productId][savedFirstKey];
        const productFirstKey = Object.keys(product.stock)[0];
        const productFirstValue = product.stock[productFirstKey];

        const savedIsColorBased = typeof savedFirstValue === 'object' && !Array.isArray(savedFirstValue);
        const productIsColorBased = typeof productFirstValue === 'object' && !Array.isArray(productFirstValue);

        // 구조가 다르면 PRODUCTS의 최신 구조로 덮어쓰기
        if (savedIsColorBased !== productIsColorBased) {
            stockData[productId] = JSON.parse(JSON.stringify(product.stock)); // Deep copy
        }
    } else {
        stockData[productId] = JSON.parse(JSON.stringify(product.stock)); // Deep copy
    }

    // 재고 구조 확인
    const firstKey = Object.keys(stockData[productId])[0];
    const isColorBasedStock = firstKey && typeof stockData[productId][firstKey] === 'object' && !Array.isArray(stockData[productId][firstKey]);

    if (isColorBasedStock) {
        // 색상별 재고 관리
        if (color && stockData[productId][color]) {
            stockData[productId][color][size] = Math.max(0, (stockData[productId][color][size] || 0) - quantity);
        }
    } else {
        // 기존 사이즈별 구조
        if (!color) {
            stockData[productId][size] = Math.max(0, (stockData[productId][size] || 0) - quantity);
        }
    }

    localStorage.setItem('productStocks', JSON.stringify(stockData));
}

function checkStock(productId, size, quantity, color = null) {
    const stock = getProductStock(productId);

    // 재고 구조 확인
    const firstKey = Object.keys(stock)[0];
    const isColorBasedStock = firstKey && typeof stock[firstKey] === 'object' && !Array.isArray(stock[firstKey]);

    if (isColorBasedStock) {
        // 색상별 재고 구조
        if (color && stock[color]) {
            // 특정 색상의 재고 확인
            const colorStock = stock[color][size] || 0;
            return colorStock >= quantity;
        } else if (!color) {
            // 색상 지정 없으면 모든 색상의 재고 합산
            let totalStock = 0;
            Object.values(stock).forEach(colorStockData => {
                if (colorStockData[size] !== undefined) {
                    totalStock += colorStockData[size];
                }
            });
            return totalStock >= quantity;
        } else {
            return false;
        }
    } else {
        // 기존 사이즈별 구조
        const sizeStock = stock[size] || 0;
        return sizeStock >= quantity;
    }
}

function getTotalStock(productId) {
    const stock = getProductStock(productId);
    let total = 0;

    // 색상별 재고 구조인지 확인
    const firstKey = Object.keys(stock)[0];
    if (firstKey && typeof stock[firstKey] === 'object') {
        // 색상별-사이즈별 구조
        Object.values(stock).forEach(colorStock => {
            total += Object.values(colorStock).reduce((sum, qty) => sum + qty, 0);
        });
    } else {
        // 기존 사이즈별 구조
        total = Object.values(stock).reduce((sum, qty) => sum + qty, 0);
    }

    return total;
}

// ===== 인증 시스템 =====
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

function requireLogin(message = '로그인이 필요한 서비스입니다.') {
    if (!isLoggedIn()) {
        alert(message);
        window.location.href = 'login.html?return=' + encodeURIComponent(window.location.href);
        return false;
    }
    return true;
}

function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        localStorage.removeItem('currentUser');
        alert('로그아웃되었습니다.');
        window.location.href = 'index.html';
    }
}

// 전역으로 노출
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.requireLogin = requireLogin;
window.logout = logout;

function renderProducts(category = null) {
    const productList = document.getElementById("product-list");
    const categoryTitle = document.getElementById("category-title");

    // index.html에 없으면 실행 안 함
    if (!productList || !categoryTitle) {
        return;
    }

    productList.innerHTML = ""; // Clear existing content

    const filteredProducts = category && category !== 'ALL'
        ? PRODUCTS.filter(product => product.category === category)
        : PRODUCTS;

    if (category && category !== 'ALL') {
        categoryTitle.textContent = category;
    } else {
        categoryTitle.textContent = "전체 상품";
    }

    // 리뷰 데이터를 한 번에 캐싱
    const reviewsCache = {};
    filteredProducts.forEach(product => {
        const reviews = JSON.parse(localStorage.getItem(`reviews_${product.id}`)) || [];
        reviewsCache[product.id] = {
            count: reviews.length,
            average: reviews.length > 0
                ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                : 0
        };
    });

    // DocumentFragment 사용으로 DOM 조작 최적화
    const fragment = document.createDocumentFragment();

    filteredProducts.forEach(product => {
        const reviewData = reviewsCache[product.id];

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isWished = wishlist.includes(product.id);

        const totalStock = window.getTotalStock ? window.getTotalStock(product.id) : 999;
        const isSoldOut = totalStock === 0;

        const colorDotsHtml = (product.colors || []).map(c => {
            const colorCode = window.getColorCode ? window.getColorCode(c) : '#ccc';
            return '<span class="color-dot" style="background-color: ' + colorCode + ';" title="' + c + '"></span>';
        }).join('');

        const soldOutBadge = isSoldOut ? '<div class="sold-out-badge">품절</div>' : '';
        const imgOpacity = isSoldOut ? 'style="opacity: 0.5;"' : '';

        const productCard = document.createElement("div");
        productCard.className = "product-card";
        if (isSoldOut) productCard.classList.add('sold-out');
        productCard.onclick = function () { viewProduct(product.id); };
        productCard.innerHTML = `
                    ${soldOutBadge}
                    <button class="wishlist-btn ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id});" title="찜하기">❤️</button>
                    <img src="${product.image}" alt="${product.name}" loading="lazy" ${imgOpacity}>
                    <h3>${product.name}</h3>
                    <p class="product-brand">${product.brand}</p>
                    <p class="product-price">₩${product.price.toLocaleString()}</p>
                    <div class="product-colors">${colorDotsHtml}</div>
                    <div class="product-review-info">
                        <span class="rating-stars">${'⭐'.repeat(Math.round(reviewData.average))}</span>
                        <span class="rating-text">${reviewData.average} (${reviewData.count})</span>
                    </div>
                `;
        fragment.appendChild(productCard);
    });

    productList.appendChild(fragment);
}

// 찜하기 토글
function toggleWishlist(productId) {
    // 로그인 체크
    if (!requireLogin('찜하기는 로그인이 필요합니다.')) {
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('찜 목록에서 제거되었습니다');
    } else {
        wishlist.push(productId);
        showToast('찜 목록에 추가되었습니다 ❤️');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    if (typeof updateWishlistCount === 'function') {
        updateWishlistCount();
    }

    // 현재 보기 새로고침
    const currentCategory = document.querySelector('.category-btn.active')?.getAttribute('data-category');
    if (currentCategory) {
        renderProducts(currentCategory);
    }
}

// 장바구니 추가 with Toast
function addToCartWithToast(productId) {
    addToCart(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    if (product && typeof showToast === 'function') {
        showToast(`${product.name}이(가) 장바구니에 추가되었습니다 🛒`);
    }
}

// Toast 알림 함수 (main.js용)
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Category button event listeners
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-btn');

    // index.html에만 카테고리 버튼이 있으므로 조건부 실행
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function () {
                const category = this.getAttribute('data-category');

                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Render products for selected category
                renderProducts(category);
            });
        });

        // Initial render - show all products
        renderProducts();
    }
});

function addToCart(productId) {
    // 로그인 체크
    if (!requireLogin('장바구니는 로그인이 필요합니다.')) {
        return;
    }

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // 토스트 알림 표시
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = `🛒 ${product.name}이(가) 장바구니에 추가되었습니다!`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    } else {
        alert(`${product.name}이(가) 장바구니에 추가되었습니다!`);
    }

}

function viewProduct(productId) {
    // 최근 본 상품에 추가
    let recentProducts = JSON.parse(localStorage.getItem('recentProducts')) || [];
    recentProducts = recentProducts.filter(id => id !== productId);
    recentProducts.unshift(productId);
    if (recentProducts.length > 10) recentProducts = recentProducts.slice(0, 10);
    localStorage.setItem('recentProducts', JSON.stringify(recentProducts));

    window.location.href = `product.html?id=${productId}`;
}

// index.html에서만 실행
if (document.getElementById('product-list')) {
    renderProducts();
}

// 전역 함수로 노출 (다른 HTML 페이지에서 사용)
window.toggleWishlist = toggleWishlist;
window.addToCart = addToCart;
window.viewProduct = viewProduct;
window.getProductStock = getProductStock;
window.updateProductStock = updateProductStock;
window.checkStock = checkStock;
window.getTotalStock = getTotalStock;