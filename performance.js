// 성능 최적화 유틸리티

// 1. 디바운스 함수 (이벤트 핸들러 최적화)
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 2. 쓰로틀 함수 (스크롤 이벤트 최적화)
function throttle(func, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 3. 이미지 지연 로딩 (Lazy Loading)
class LazyImageLoader {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01,
      ...options
    };
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.options
      );
      this.observeImages();
    } else {
      // 폴백: IntersectionObserver를 지원하지 않는 브라우저
      this.loadAllImages();
    }
  }

  observeImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => this.observer.observe(img));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;

    // 이미지 로딩 중 표시
    img.classList.add('loading');

    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.removeAttribute('data-src');
      img.classList.remove('loading');
      img.classList.add('loaded');
    };
    tempImg.onerror = () => {
      img.classList.remove('loading');
      img.classList.add('error');
      // 기본 이미지로 대체
      img.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found';
    };
    tempImg.src = src;
  }

  loadAllImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => this.loadImage(img));
  }

  refresh() {
    if (this.observer) {
      this.observeImages();
    }
  }
}

// 4. 무한 스크롤
class InfiniteScroll {
  constructor(options = {}) {
    this.container = options.container || document.getElementById('products-list');
    this.loadMore = options.loadMore;
    this.threshold = options.threshold || 200;
    this.loading = false;
    this.hasMore = true;
    this.page = 1;
    this.init();
  }

  init() {
    if (!this.container || !this.loadMore) return;

    this.handleScroll = throttle(() => {
      if (this.shouldLoadMore()) {
        this.load();
      }
    }, 200);

    window.addEventListener('scroll', this.handleScroll);
  }

  shouldLoadMore() {
    if (this.loading || !this.hasMore) return false;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - this.threshold;

    return scrollPosition >= threshold;
  }

  async load() {
    this.loading = true;
    this.showLoader();

    try {
      const hasMore = await this.loadMore(this.page);
      this.hasMore = hasMore !== false;
      this.page++;
    } catch (error) {
      console.error('Failed to load more items:', error);
    } finally {
      this.loading = false;
      this.hideLoader();
    }
  }

  showLoader() {
    let loader = document.getElementById('infinite-scroll-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'infinite-scroll-loader';
      loader.className = 'infinite-scroll-loader';
      loader.innerHTML = '<div class="loader-spinner"></div><p>로딩 중...</p>';
      this.container.parentElement.appendChild(loader);
    }
    loader.style.display = 'flex';
  }

  hideLoader() {
    const loader = document.getElementById('infinite-scroll-loader');
    if (loader) {
      loader.style.display = 'none';
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}

// 5. 로컬 스토리지 캐싱
class CacheManager {
  constructor(options = {}) {
    this.prefix = options.prefix || 'insook_';
    this.defaultExpiry = options.defaultExpiry || 5 * 60 * 1000; // 5분
  }

  set(key, data, expiry = this.defaultExpiry) {
    const item = {
      data: data,
      timestamp: Date.now(),
      expiry: expiry
    };
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (e) {
      console.warn('LocalStorage quota exceeded, clearing old cache');
      this.clearExpired();
    }
  }

  get(key) {
    try {
      const itemStr = localStorage.getItem(this.prefix + key);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      const now = Date.now();

      // 만료 확인
      if (now - item.timestamp > item.expiry) {
        this.remove(key);
        return null;
      }

      return item.data;
    } catch (e) {
      console.error('Error reading from cache:', e);
      return null;
    }
  }

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  clear() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  clearExpired() {
    const keys = Object.keys(localStorage);
    const now = Date.now();

    keys.forEach(key => {
      if (!key.startsWith(this.prefix)) return;

      try {
        const itemStr = localStorage.getItem(key);
        const item = JSON.parse(itemStr);

        if (now - item.timestamp > item.expiry) {
          localStorage.removeItem(key);
        }
      } catch (e) {
        // 잘못된 형식의 데이터는 삭제
        localStorage.removeItem(key);
      }
    });
  }
}

// 6. 이미지 압축 (리뷰 업로드 시)
class ImageCompressor {
  constructor(options = {}) {
    this.maxWidth = options.maxWidth || 800;
    this.maxHeight = options.maxHeight || 800;
    this.quality = options.quality || 0.8;
  }

  async compress(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // 비율 유지하며 크기 조정
          if (width > height) {
            if (width > this.maxWidth) {
              height = Math.round((height * this.maxWidth) / width);
              width = this.maxWidth;
            }
          } else {
            if (height > this.maxHeight) {
              width = Math.round((width * this.maxHeight) / height);
              height = this.maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // WebP 지원 확인
          const format = this.supportsWebP() ? 'image/webp' : 'image/jpeg';
          const compressedDataUrl = canvas.toDataURL(format, this.quality);

          resolve(compressedDataUrl);
        };

        img.onerror = reject;
        img.src = e.target.result;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  supportsWebP() {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  }
}

// 7. DOM 업데이트 최적화 (DocumentFragment 사용)
class DOMBatcher {
  constructor() {
    this.fragment = document.createDocumentFragment();
  }

  add(element) {
    this.fragment.appendChild(element);
  }

  appendTo(container) {
    container.appendChild(this.fragment);
    this.fragment = document.createDocumentFragment();
  }

  clear() {
    this.fragment = document.createDocumentFragment();
  }
}

// 8. 성능 모니터링
class PerformanceMonitor {
  constructor() {
    this.marks = {};
  }

  start(label) {
    this.marks[label] = performance.now();
  }

  end(label, log = true) {
    if (!this.marks[label]) {
      console.warn(`No mark found for "${label}"`);
      return null;
    }

    const duration = performance.now() - this.marks[label];
    delete this.marks[label];

    if (log) {
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  measure(label, callback) {
    this.start(label);
    const result = callback();
    this.end(label);
    return result;
  }

  async measureAsync(label, callback) {
    this.start(label);
    const result = await callback();
    this.end(label);
    return result;
  }
}

// 전역 인스턴스 생성
const cache = new CacheManager();
const imageCompressor = new ImageCompressor();
const perfMonitor = new PerformanceMonitor();
let lazyLoader = null;
let infiniteScroll = null;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 지연 로딩 초기화
  lazyLoader = new LazyImageLoader();

  // 만료된 캐시 정리
  cache.clearExpired();

  // 성능 측정
  if (performance.timing) {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`📊 페이지 로드 시간: ${loadTime}ms`);
    });
  }
});

// 유틸리티 함수 내보내기
window.performanceUtils = {
  debounce,
  throttle,
  LazyImageLoader,
  InfiniteScroll,
  CacheManager,
  ImageCompressor,
  DOMBatcher,
  PerformanceMonitor,
  cache,
  imageCompressor,
  perfMonitor,
  lazyLoader
};
