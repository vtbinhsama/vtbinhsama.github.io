// Xử lý sự kiện cho nút phân loại
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    
    // Thêm sự kiện click cho tất cả các nút lọc
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Loại bỏ lớp active từ tất cả các nút
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Thêm lớp active cho nút được nhấp
            button.classList.add('active');
            
            // Lấy giá trị lọc
            const filterValue = button.getAttribute('data-filter');
            
            // Nếu filterValue khác 'all', chuyển hướng đến trang tương ứng
            if (filterValue !== 'all') {
                // Chuyển đến trang tương ứng
                window.location.href = `./src/pages/${filterValue}.html`;
            } else {
                // Nếu là "Tất cả", hiển thị toàn bộ tài khoản
                filterAccounts('all');
            }
        });
    });

    // Hàm lọc tài khoản dựa trên loại
    function filterAccounts(category) {
        const accountCards = document.querySelectorAll('.mario-account-card');
        
        accountCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
});

// Thêm thuộc tính data-category cho mỗi thẻ tài khoản khi render
function addCategoryToAccounts() {
    const accountCards = document.querySelectorAll('.mario-account-card');
    
    accountCards.forEach(card => {
        const accountName = card.querySelector('h3').textContent.toLowerCase();
        
        if (accountName.includes('vanguard')) {
            card.setAttribute('data-category', 'anime-vanguard');
        } else if (accountName.includes('adventure')) {
            card.setAttribute('data-category', 'anime-adventure');
        } else if (accountName.includes('last stand')) {
            card.setAttribute('data-category', 'anime-last-stand');
        } else if (accountName.includes('reborn')) {
            card.setAttribute('data-category', 'anime-reborn');
        }
    });
}

// Gọi hàm này sau khi render tài khoản
document.addEventListener('accountsRendered', addCategoryToAccounts);
// Script cho phần filter.js
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các nút bộ lọc danh mục
    const filterButtons = document.querySelectorAll('.category-filter-button');
    
    // Lấy container price list để hiển thị/ẩn tùy thuộc vào trạng thái
    const priceListContainer = document.querySelector('.mario-price-list-container');
    
    // Các biến để theo dõi trạng thái
    let currentCategory = 'all';
    let currentPrice = 500; // Mặc định là tất cả giá

    // Thêm sự kiện click cho các nút bộ lọc
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Loại bỏ class active từ tất cả các nút
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Thêm class active cho nút được click
            this.classList.add('active');
            
            // Lấy giá trị filter từ thuộc tính data-filter
            const filterValue = this.getAttribute('data-filter');
            currentCategory = filterValue;
            
            // Hiển thị Price List nếu là trang phân loại cụ thể
            if (filterValue !== 'all') {
                // Thêm class vào body để chỉ ra rằng đây là trang phân loại
                document.body.classList.add('category-page');
                
                // Hiển thị price list
                priceListContainer.style.display = 'block';
                
                // Play sound - nếu có
                playMarioSound && playMarioSound('coin');
            } else {
                // Nếu là "All Accounts", ẩn price list
                document.body.classList.remove('category-page');
                priceListContainer.style.display = 'none';
                
                // Play sound - nếu có
                playMarioSound && playMarioSound('jump');
            }
            
            // Gọi hàm lọc account
            filterAccounts();
        });
    });
    
    // Lắng nghe sự kiện thay đổi giá
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.addEventListener('change', function() {
            currentPrice = Number(this.value);
            
            // Play sound - nếu có
            playMarioSound && playMarioSound('coin');
            
            // Gọi hàm lọc account
            filterAccounts();
        });
    }
    
    // Lắng nghe sự kiện tìm kiếm
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterAccounts);
    }
    
    // Hàm lọc account dựa trên category, price, và search term
    function filterAccounts() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        let filteredAccounts = accounts;
        
        // Lọc theo danh mục
        if (currentCategory !== 'all') {
            // Lấy chỉ tên danh mục (ví dụ: từ "anime-vanguard" thành "vanguard")
            const categoryName = currentCategory.split('-').pop();
            
            filteredAccounts = filteredAccounts.filter(account => {
                // Kiểm tra tên tài khoản có chứa tên danh mục không
                return account.name.toLowerCase().includes(categoryName.toLowerCase());
            });
        }
        
        // Lọc theo giá
        filteredAccounts = filteredAccounts.filter(account => {
            return account.price <= currentPrice;
        });
        
        // Lọc theo từ khóa tìm kiếm
        if (searchTerm) {
            filteredAccounts = filteredAccounts.filter(account => 
                account.name.toLowerCase().includes(searchTerm) ||
                account.code.toLowerCase().includes(searchTerm)
            );
        }
        
        // Hiển thị kết quả
        renderAccounts(filteredAccounts);
    }
    
    // Khởi tạo: kiểm tra URL để xem có parameter category không
    function initializeFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam) {
            // Tìm nút tương ứng với tham số category
            const targetButton = Array.from(filterButtons).find(
                button => button.getAttribute('data-filter') === categoryParam
            );
            
            // Nếu tìm thấy nút, trigger click event
            if (targetButton) {
                targetButton.click();
            }
        } else {
            // Mặc định hiển thị tất cả tài khoản
            filterAccounts();
        }
    }
    
    // Chỉ khởi tạo bộ lọc nếu accounts array đã được định nghĩa
    if (typeof accounts !== 'undefined' && Array.isArray(accounts)) {
        initializeFilters();
    } else {
        // Nếu accounts array chưa được định nghĩa, đăng ký sự kiện để đợi
        document.addEventListener('accountsLoaded', initializeFilters);
    }
});
