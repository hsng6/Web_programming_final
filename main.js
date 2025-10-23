const PRODUCTS = [
    // TOPS
    { id: 1, name: "화이트 티셔츠", price: 25000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop", category: "TOPS" },
    { id: 2, name: "블랙 티셔츠", price: 25000, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop", category: "TOPS" },
    { id: 3, name: "스트라이프 셔츠", price: 35000, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop", category: "TOPS" },
    { id: 4, name: "니트", price: 45000, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop", category: "TOPS" },
    { id: 17, name: "오버핏 후드티", price: 38000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop", category: "TOPS" },
    { id: 18, name: "크롭 티셔츠", price: 22000, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop", category: "TOPS" },
    { id: 19, name: "린넨 셔츠", price: 42000, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop", category: "TOPS" },
    { id: 20, name: "맨투맨", price: 35000, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop", category: "TOPS" },
    { id: 21, name: "폴로 셔츠", price: 48000, image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop", category: "TOPS" },
    { id: 22, name: "가디건", price: 52000, image: "https://images.unsplash.com/photo-1591047139856-e815a7b33a51?w=500&h=500&fit=crop", category: "TOPS" },
    
    // PANTS
    { id: 5, name: "블랙 청바지", price: 50000, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop", category: "PANTS" },
    { id: 6, name: "블루 청바지", price: 50000, image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500&h=500&fit=crop", category: "PANTS" },
    { id: 7, name: "슬랙스", price: 60000, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop", category: "PANTS" },
    { id: 8, name: "조거 팬츠", price: 40000, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=500&fit=crop", category: "PANTS" },
    { id: 23, name: "와이드 팬츠", price: 55000, image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop", category: "PANTS" },
    { id: 24, name: "카고 팬츠", price: 58000, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=500&fit=crop", category: "PANTS" },
    { id: 25, name: "치노 팬츠", price: 48000, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop", category: "PANTS" },
    { id: 26, name: "반바지", price: 35000, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop", category: "PANTS" },
    { id: 27, name: "트레이닝 팬츠", price: 42000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop", category: "PANTS" },
    { id: 28, name: "스키니 진", price: 52000, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop", category: "PANTS" },
    
    // OUTER
    { id: 9, name: "데님 자켓", price: 80000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop", category: "OUTER" },
    { id: 10, name: "가죽 자켓", price: 150000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop", category: "OUTER" },
    { id: 11, name: "패딩", price: 120000, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&h=500&fit=crop", category: "OUTER" },
    { id: 12, name: "코트", price: 180000, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&h=500&fit=crop", category: "OUTER" },
    { id: 29, name: "블레이저", price: 95000, image: "https://images.unsplash.com/photo-1593032465175-ac5f1f4516b3?w=500&h=500&fit=crop", category: "OUTER" },
    { id: 30, name: "트렌치 코트", price: 165000, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop", category: "OUTER" },
    { id: 31, name: "후드 집업", price: 68000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop", category: "OUTER" },
    { id: 32, name: "바람막이", price: 75000, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop", category: "OUTER" },
    { id: 33, name: "롱 패딩", price: 185000, image: "https://images.unsplash.com/photo-1544923246-77ba2772dc27?w=500&h=500&fit=crop", category: "OUTER" },
    { id: 34, name: "플리스 자켓", price: 62000, image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&h=500&fit=crop", category: "OUTER" },
    
    // SHOES
    { id: 13, name: "화이트 스니커즈", price: 90000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop", category: "SHOES" },
    { id: 14, name: "블랙 스니커즈", price: 90000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop", category: "SHOES" },
    { id: 15, name: "로퍼", price: 120000, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&h=500&fit=crop", category: "SHOES" },
    { id: 16, name: "부츠", price: 150000, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&h=500&fit=crop", category: "SHOES" },
    { id: 35, name: "러닝화", price: 98000, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop", category: "SHOES" },
    { id: 36, name: "슬리퍼", price: 28000, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=500&fit=crop", category: "SHOES" },
    { id: 37, name: "샌들", price: 45000, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=500&fit=crop", category: "SHOES" },
    { id: 38, name: "구두", price: 135000, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&h=500&fit=crop", category: "SHOES" },
    { id: 39, name: "하이탑 스니커즈", price: 105000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop", category: "SHOES" },
    { id: 40, name: "워커", price: 145000, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&h=500&fit=crop", category: "SHOES" }
];

function renderProducts(category = null) {
    const productList = document.getElementById("product-list");
    const categoryTitle = document.getElementById("category-title");
    
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
                
                const productCard = document.createElement("div");
                productCard.className = "product-card";
                productCard.onclick = function() { viewProduct(product.id); };
                productCard.innerHTML = `
                    <button class="wishlist-btn ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id});" title="찜하기">❤️</button>
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <h3>${product.name}</h3>
                    <p class="product-price">₩${product.price.toLocaleString()}</p>
                    <div class="product-review-info">
                        <span class="rating-stars">${'⭐'.repeat(Math.round(reviewData.average))}</span>
                        <span class="rating-text">${reviewData.average} (${reviewData.count})</span>
                    </div>
                    <button class="cart-icon-btn" onclick="event.stopPropagation(); viewProduct(${product.id});" title="사이즈 선택 후 장바구니">🛒 담기</button>
                `;
                fragment.appendChild(productCard);
            });
            
            productList.appendChild(fragment);
        }

        // 찜하기 토글
        function toggleWishlist(productId) {
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
        }// Category button event listeners
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
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
});

function addToCart(productId) {
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
    alert(`${product.name}이(가) 장바구니에 추가되었습니다!`);
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

renderCategories();
renderProducts();