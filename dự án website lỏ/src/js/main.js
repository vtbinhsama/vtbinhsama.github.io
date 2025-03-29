// Account data
const accounts = [
    {
        id: 1,
        code: "AV001",
        name: "Anime Vanguard Account",
        level: 50,
        price: 120.00,
        mainImage: "./images/accanimevanguard.jpg",
        detailImages: [
            "./images/accanimevanguard.jpg"
        ],
        seller: {
            name: "Chunnyhandsome",
            contactMethod: "discord : chunnyyhandsome | https://discord.gg/YHm5RuCW45",
            verification: "Active"
        },
        paymentMethods: ["Paypal(FnF)", "Crypto(USDT,LTC,ETH,BTC,USDC)", "BINANCE GIFT CARD"],
        description: "High-level Anime Vanguard account with rare units and max upgrades."
    },
    {
        id: 2,
        code: "AA001",
        name: "Anime Adventure Account",
        level: 60,
        price: 249.99,
        mainImage: "./images/accanimevanguard.jpg",
        detailImages: [
            "./images/accanimevanguard.jpg"
        ],
        seller: {
            name: "GameMaster456",
            contactMethod: "+84 987 654 321",
            verification: "Top Seller"
        },
        paymentMethods: ["Bank Transfer", "PayPal"],
        description: "Premium Anime Adventure account with extensive game progression."
    },
    {
        id: 3,
        code: "ALS001",
        name: "Anime Last Stand Account",
        level: 45,
        price: 179.99,
        mainImage: "./images/accanimevanguard.jpg",
        detailImages: [
            "./images/accanimevanguard.jpg"
        ],
        seller: {
            name: "GameNinja789",
            contactMethod: "+84 555 123 456",
            verification: "Trusted Seller"
        },
        paymentMethods: ["Momo", "ZaloPay"],
        description: "Solid Anime Last Stand account with strategic units."
    },
    {
        id: 4,
        code: "AR001",
        name: "Anime Reborn Account",
        level: 55,
        price: 199.99,
        mainImage: "./images/accanimevanguard.jpg",
        detailImages: [
            "./images/accanimevanguard.jpg"
        ],
        seller: {
            name: "RebirthMaster",
            contactMethod: "+84 444 555 666",
            verification: "Verified Seller"
        },
        paymentMethods: ["PayPal", "Crypto", "Bank Transfer"],
        description: "Rare Anime Reborn account with exclusive characters and items."
    }
];

// Render account list
function renderAccounts(filteredAccounts = accounts) {
    const accountsList = document.getElementById('accounts-list');
    if (!accountsList) return;

    accountsList.innerHTML = filteredAccounts.map(account => `
        <div class="mario-account-card bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:rotate-1 perspective-500" data-id="${account.id}">
            <div class="relative account-image-container">
                <img 
                    src="${account.mainImage}" 
                    alt="${account.name}" 
                    class="w-full h-48 object-cover mario-image-hover"
                >
                <div class="mario-coin-overlay"></div>
            </div>
            <div class="p-4 mario-card-background">
                <h3 class="text-xl font-bold mb-2 mario-text-shadow">${account.name}</h3>
                <div class="flex justify-between items-center mb-2">
                    <span class="mario-code-badge">
                        Code: ${account.code}
                    </span>
                </div>
                <div class="flex justify-between items-center mb-2">
                    <p class="mario-level-text">Level: ${account.level}</p>
                    <span class="mario-price-text">
                        $${account.price.toFixed(2)}
                    </span>
                </div>
                <button 
                    onclick="showAccountDetails(${account.id})"
                    class="mario-details-button"
                >
                    View Details
                </button>
            </div>
        </div>
    `).join('');

    // Dispatch event for account rendering completed
    const renderedEvent = new Event('accountsRendered');
    document.dispatchEvent(renderedEvent);

    // Add hover effects and animations
    addMarioEffects();
}

// Show account details
function showAccountDetails(id) {
    const account = accounts.find(acc => acc.id === id);
    if (!account) return;

    const modal = document.getElementById('account-detail-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Play Mario sound effect
    playMarioSound('pipe');

    // Ensure modal is displayed correctly
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Set modal content
    modalContent.innerHTML = `
        <div class="mario-modal-content">
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="w-full sm:w-2/5">
                    <div class="mario-image-container rounded-lg overflow-hidden relative">
                        <img 
                            src="${account.mainImage}" 
                            alt="${account.name}" 
                            class="w-full h-auto rounded-lg cursor-pointer mario-hover-effect"
                            onclick="openFullImage('${account.mainImage}')"
                        >
                        <div class="mario-image-shine"></div>
                    </div>
                </div>
                <div class="w-full sm:w-3/5">
                    <h2 class="text-xl font-bold mb-2 mario-title">${account.name}</h2>
                    <p class="mario-description mb-3">${account.description}</p>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="mario-badge mario-badge-code">
                            Code: ${account.code}
                        </span>
                        <span class="mario-badge mario-badge-level">
                            Level: ${account.level}
                        </span>
                    </div>
                    
                    <div class="mario-section mb-4">
                        <h3 class="font-bold mb-2">Payment Methods</h3>
                        <div class="flex flex-wrap gap-2">
                            ${account.paymentMethods.map(method => `
                                <span class="mario-payment-method">${method}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="flex justify-between items-center mt-4">
                        <span class="mario-price">
                            $${account.price.toFixed(2)}
                        </span>
                        <button class="mario-button" onclick="contactSeller('${account.seller.contactMethod}')">
                            Contact Owner
                        </button>
                    </div>
                    
                    <div class="mt-3 text-sm mario-seller-info">
                        <p>Seller: ${account.seller.name}</p>
                        <p>Status: ${account.seller.verification}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Position close button correctly
    setTimeout(function() {
        const closeButton = document.getElementById('close-modal');
        if (closeButton) {
            closeButton.style.position = 'absolute';
            closeButton.style.top = '-20px';
            closeButton.style.right = '-20px';
            closeButton.style.zIndex = '1000';
        }
    }, 10);
}

// Function to contact seller
function contactSeller(contactMethod) {
    // Play sound
    playMarioSound('coin');
    
    // In a real application, this would open a chat or copy the contact info
    alert(`Contact the seller at: ${contactMethod}`);
}

// Ensure close modal
document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            const modal = document.getElementById('account-detail-modal');
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            
            // Play Mario sound effect
            playMarioSound('jump');
        });
    }
});

// Function for full image view
function openFullImage(imageSrc) {
    // Play Mario sound effect
    playMarioSound('powerup');
    
    // Remove old modal if exists
    const existingModal = document.getElementById('full-image-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create new modal
    const fullImageModal = document.createElement('div');
    fullImageModal.id = 'full-image-modal';
    fullImageModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    fullImageModal.innerHTML = `
        <img src="${imageSrc}" alt="Full Image" style="max-width: 70%; max-height: 70%; object-fit: contain;">
        <button id="close-full-image" style="
            position: absolute; 
            top: 20px; 
            right: 20px; 
            color: white; 
            font-size: 30px; 
            background: none; 
            border: none;
        ">&times;</button>
    `;

    // Add close event
    fullImageModal.addEventListener('click', (e) => {
        if (e.target === fullImageModal || e.target.id === 'close-full-image') {
            document.body.removeChild(fullImageModal);
            // Play Mario sound effect
            playMarioSound('jump');
        }
    });

    // Add modal to body
    document.body.appendChild(fullImageModal);
}

// Handle search and render
document.addEventListener('DOMContentLoaded', () => {
    renderAccounts();

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredAccounts = accounts.filter(account => 
                account.name.toLowerCase().includes(searchTerm) ||
                account.code.toLowerCase().includes(searchTerm)
            );
            renderAccounts(filteredAccounts);
        });
    }
});

// Function to play Mario sound effects
function playMarioSound(type) {
    // Sound definitions (URLs would be used in production)
    const sounds = {
        coin: './sounds/coin.mp3',
        jump: './sounds/jump.mp3',
        pipe: './sounds/pipe.mp3',
        powerup: './sounds/powerup.mp3'
    };
    
    // In a production environment, you would uncomment this
    // const audio = new Audio(sounds[type]);
    // audio.volume = 0.5;
    // audio.play();
    
    console.log(`Playing ${type} sound`);
}

// Add Mario-themed interactive effects
function addMarioEffects() {
    const cards = document.querySelectorAll('.mario-account-card');
    
    cards.forEach(card => {
        // Add hover sound effect
        card.addEventListener('mouseenter', () => {
            playMarioSound('coin');
        });
        
        // Add interactive elements (mushrooms, coins) on hover
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;
            
            // This would create particle effects in a production environment
            console.log(`Mouse position on card: ${x}, ${y}`);
        });
    });
}

// Add scroll header effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.mario-header');
    let isScrolling;
    
    window.addEventListener('scroll', function() {
        // Add scrolling class when scrolling
        header.classList.add('scrolling');
        
        // Clear current timeout
        clearTimeout(isScrolling);
        
        // Set new timeout
        isScrolling = setTimeout(function() {
            // When scrolling stops, remove scrolling class
            header.classList.remove('scrolling');
        }, 500); // Wait 500ms after scrolling stops
    });
});
// Script chính cho trang web - main.js

// Kiểm tra nếu chúng ta đang ở trang phân loại dựa vào URL
function checkIfCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Nếu có tham số category trong URL, thêm class vào body
    if (categoryParam) {
        document.body.classList.add('category-page');
        
        // Hiển thị price list
        const priceListContainer = document.querySelector('.mario-price-list-container');
        if (priceListContainer) {
            priceListContainer.style.display = 'block';
        }
    }
}

// Render account list
function renderAccounts(filteredAccounts = accounts) {
    const accountsList = document.getElementById('accounts-list');
    if (!accountsList) return;

    accountsList.innerHTML = filteredAccounts.map(account => `
        <div class="mario-account-card bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:rotate-1 perspective-500" data-id="${account.id}">
            <div class="relative account-image-container">
                <img 
                    src="${account.mainImage}" 
                    alt="${account.name}" 
                    class="w-full h-48 object-cover mario-image-hover"
                >
                <div class="mario-coin-overlay"></div>
            </div>
            <div class="p-4 mario-card-background">
                <h3 class="text-xl font-bold mb-2 mario-text-shadow">${account.name}</h3>
                <div class="flex justify-between items-center mb-2">
                    <span class="mario-code-badge">
                        Code: ${account.code}
                    </span>
                </div>
                <div class="flex justify-between items-center mb-2">
                    <p class="mario-level-text">Level: ${account.level}</p>
                    <span class="mario-price-text">
                        $${account.price.toFixed(2)}
                    </span>
                </div>
                <button 
                    onclick="showAccountDetails(${account.id})"
                    class="mario-details-button"
                >
                    View Details
                </button>
            </div>
        </div>
    `).join('');

    // Dispatch event for account rendering completed
    const renderedEvent = new Event('accountsRendered');
    document.dispatchEvent(renderedEvent);

    // Add hover effects and animations
    addMarioEffects();
}

// Show account details
function showAccountDetails(id) {
    const account = accounts.find(acc => acc.id === id);
    if (!account) return;

    const modal = document.getElementById('account-detail-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Play Mario sound effect
    playMarioSound('pipe');

    // Ensure modal is displayed correctly
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Set modal content
    modalContent.innerHTML = `
        <div class="mario-modal-content">
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="w-full sm:w-2/5">
                    <div class="mario-image-container rounded-lg overflow-hidden relative">
                        <img 
                            src="${account.mainImage}" 
                            alt="${account.name}" 
                            class="w-full h-auto rounded-lg cursor-pointer mario-hover-effect"
                            onclick="openFullImage('${account.mainImage}')"
                        >
                        <div class="mario-image-shine"></div>
                    </div>
                </div>
                <div class="w-full sm:w-3/5">
                    <h2 class="text-xl font-bold mb-2 mario-title">${account.name}</h2>
                    <p class="mario-description mb-3">${account.description}</p>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="mario-badge mario-badge-code">
                            Code: ${account.code}
                        </span>
                        <span class="mario-badge mario-badge-level">
                            Level: ${account.level}
                        </span>
                    </div>
                    
                    <div class="mario-section mb-4">
                        <h3 class="font-bold mb-2">Payment Methods</h3>
                        <div class="flex flex-wrap gap-2">
                            ${account.paymentMethods.map(method => `
                                <span class="mario-payment-method">${method}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="flex justify-between items-center mt-4">
                        <span class="mario-price">
                            $${account.price.toFixed(2)}
                        </span>
                        <button class="mario-button" onclick="contactSeller('${account.seller.contactMethod}')">
                            Contact Owner
                        </button>
                    </div>
                    
                    <div class="mt-3 text-sm mario-seller-info">
                        <p>Seller: ${account.seller.name}</p>
                        <p>Status: ${account.seller.verification}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Position close button correctly
    setTimeout(function() {
        const closeButton = document.getElementById('close-modal');
        if (closeButton) {
            closeButton.style.position = 'absolute';
            closeButton.style.top = '-20px';
            closeButton.style.right = '-20px';
            closeButton.style.zIndex = '1000';
        }
    }, 10);
}

// Function to contact seller
function contactSeller(contactMethod) {
    // Play sound
    playMarioSound('coin');
    
    // In a real application, this would open a chat or copy the contact info
    alert(`Contact the seller at: ${contactMethod}`);
}

// Ensure close modal
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra nếu đang ở trang danh mục
    checkIfCategoryPage();
    
    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            const modal = document.getElementById('account-detail-modal');
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            
            // Play Mario sound effect
            playMarioSound('jump');
        });
    }
    
    // Dispatch event to notify that accounts are ready
    if (typeof accounts !== 'undefined' && Array.isArray(accounts)) {
        const accountsLoadedEvent = new Event('accountsLoaded');
        document.dispatchEvent(accountsLoadedEvent);
    }
});

// Function for full image view
function openFullImage(imageSrc) {
    // Play Mario sound effect
    playMarioSound('powerup');
    
    // Remove old modal if exists
    const existingModal = document.getElementById('full-image-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create new modal
    const fullImageModal = document.createElement('div');
    fullImageModal.id = 'full-image-modal';
    fullImageModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    fullImageModal.innerHTML = `
        <img src="${imageSrc}" alt="Full Image" style="max-width: 70%; max-height: 70%; object-fit: contain;">
        <button id="close-full-image" style="
            position: absolute; 
            top: 20px; 
            right: 20px; 
            color: white; 
            font-size: 30px; 
            background: none; 
            border: none;
        ">&times;</button>
    `;

    // Add close event
    fullImageModal.addEventListener('click', (e) => {
        if (e.target === fullImageModal || e.target.id === 'close-full-image') {
            document.body.removeChild(fullImageModal);
            // Play Mario sound effect
            playMarioSound('jump');
        }
    });

    // Add modal to body
    document.body.appendChild(fullImageModal);
}

// Function to play Mario sound effects
function playMarioSound(type) {
    // Sound definitions (URLs would be used in production)
    const sounds = {
        coin: './sounds/coin.mp3',
        jump: './sounds/jump.mp3',
        pipe: './sounds/pipe.mp3',
        powerup: './sounds/powerup.mp3'
    };
    
    // In a production environment, you would uncomment this
    // const audio = new Audio(sounds[type]);
    // audio.volume = 0.5;
    // audio.play();
    
    console.log(`Playing ${type} sound`);
}

// Add Mario-themed interactive effects
function addMarioEffects() {
    const cards = document.querySelectorAll('.mario-account-card');
    
    cards.forEach(card => {
        // Add hover sound effect
        card.addEventListener('mouseenter', () => {
            playMarioSound('coin');
        });
        
        // Add interactive elements (mushrooms, coins) on hover
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;
            
            // This would create particle effects in a production environment
            console.log(`Mouse position on card: ${x}, ${y}`);
        });
    });
}

// Add scroll header effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.mario-header');
    let isScrolling;
    
    window.addEventListener('scroll', function() {
        // Add scrolling class when scrolling
        header.classList.add('scrolling');
        
        // Clear current timeout
        clearTimeout(isScrolling);
        
        // Set new timeout
        isScrolling = setTimeout(function() {
            // When scrolling stops, remove scrolling class
            header.classList.remove('scrolling');
        }, 500); // Wait 500ms after scrolling stops
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.mario-logo-container');
    const marioCharacter = document.querySelector('.mario-character');
    
    logoContainer.addEventListener('click', function(e) {
        // Ngăn chặn hành vi mặc định để thêm hiệu ứng
        if(e.target === marioCharacter) {
            e.preventDefault();
            
            // Thêm hiệu ứng nhảy
            marioCharacter.classList.add('mario-jump');
            
            // Phát âm thanh Mario (nếu có)
            playMarioSound && playMarioSound('jump');
            
            // Xóa class sau khi animation kết thúc
            setTimeout(function() {
                marioCharacter.classList.remove('mario-jump');
                // Chuyển đến trang chủ sau hiệu ứng
                window.location.href = 'index.html';
            }, 500);
        }
    });
});

// CSS cho hiệu ứng nhảy
// Thêm vào file CSS
/*
@keyframes mario-jump {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
}

.mario-jump {
    animation: mario-jump 0.5s ease;
}
*/