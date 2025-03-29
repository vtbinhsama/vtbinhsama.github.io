// Script cho phần priceRange.js
document.addEventListener('DOMContentLoaded', function() {
    // Lấy select element để lọc theo giá
    const priceRange = document.getElementById('price-range');
    if (!priceRange) return;
    
    // Thêm hiệu ứng khi thay đổi giá
    priceRange.addEventListener('change', function() {
        // Lấy giá trị được chọn
        const selectedPrice = Number(this.value);
        
        // Thêm hiệu ứng visual khi thay đổi giá
        const priceListContainer = document.querySelector('.mario-price-list-container');
        if (priceListContainer) {
            // Thêm class để tạo hiệu ứng nhấp nháy
            priceListContainer.classList.add('price-changed');
            
            // Xóa class sau 500ms
            setTimeout(function() {
                priceListContainer.classList.remove('price-changed');
            }, 500);
        }
        
        // Nếu có hàm filter từ filter.js, không làm gì thêm
        if (typeof filterAccounts === 'function') {
            return;
        }
        
        // Filter accounts dựa trên giá (fallback nếu không có filterAccounts)
        const accountCards = document.querySelectorAll('.mario-account-card');
        accountCards.forEach(card => {
            const priceElement = card.querySelector('.mario-price-text');
            if (priceElement) {
                // Lấy giá từ string "$xxx.xx"
                const price = parseFloat(priceElement.textContent.replace('$', ''));
                
                if (selectedPrice >= 500 || price <= selectedPrice) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
    
    // Khởi tạo giá trị ban đầu từ URL nếu có
    function initPriceFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const priceParam = urlParams.get('price');
        
        if (priceParam && !isNaN(Number(priceParam))) {
            // Tìm option phù hợp với giá trị giá từ URL
            const options = Array.from(priceRange.options);
            const targetOption = options.find(option => Number(option.value) === Number(priceParam));
            
            // Nếu tìm thấy option phù hợp, chọn nó
            if (targetOption) {
                priceRange.value = targetOption.value;
                
                // Trigger change event để áp dụng bộ lọc
                const event = new Event('change');
                priceRange.dispatchEvent(event);
            }
        }
    }
    
    // Gọi hàm khởi tạo
    initPriceFromURL();
    
    // Cập nhật URL khi thay đổi giá
    priceRange.addEventListener('change', function() {
        const currentURL = new URL(window.location.href);
        const urlParams = new URLSearchParams(currentURL.search);
        
        // Cập nhật hoặc thêm tham số price
        urlParams.set('price', this.value);
        
        // Cập nhật URL mà không reload trang
        const newURL = currentURL.pathname + '?' + urlParams.toString();
        window.history.pushState({}, '', newURL);
    });
});

// Thêm CSS animation cho hiệu ứng thay đổi giá
(function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes price-change-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); }
            100% { transform: scale(1); }
        }
        
        .price-changed {
            animation: price-change-pulse 0.5s ease;
        }
    `;
    document.head.appendChild(style);
})();