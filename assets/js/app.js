// Main App Logic

// Cart State
let cart = JSON.parse(localStorage.getItem('bynex_cart')) || [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setupMobileMenu();
    
    // Page specific initializations
    if(window.location.pathname.includes('shop.html')) {
        renderProducts(window.db.products);
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        renderFeaturedProducts();
    } else if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
});

// Mobile Menu Toggle
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if(btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

// Add to Cart
function addToCart(productId) {
    const product = window.db.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showToast('Added to Cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    if(window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            if(window.location.pathname.includes('cart.html')) {
                renderCart();
            }
        }
    }
}

function saveCart() {
    localStorage.setItem('bynex_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElements.forEach(el => {
        el.textContent = totalItems;
        if(totalItems > 0) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-sky-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-full opacity-0 z-50';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-full', 'opacity-0');
    }, 100);

    setTimeout(() => {
        toast.classList.add('translate-y-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Render Products (Shop & Home)
function generateProductCard(product) {
    return `
        <div class="glass product-card rounded-2xl overflow-hidden animate-fade-in flex flex-col h-full">
            <div class="relative img-zoom-container h-48 bg-slate-800/50 flex items-center justify-center overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="object-cover w-full h-full opacity-80 mix-blend-screen">
                ${!product.inStock ? '<div class="absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded">Out of Stock</div>' : ''}
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <div class="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-2">${product.category}</div>
                <a href="product.html?id=${product.id}" class="text-lg font-heading font-bold text-slate-100 hover:text-sky-400 transition-colors line-clamp-2 mb-2">${product.name}</a>
                <div class="mt-auto">
                    <div class="text-2xl font-bold text-white mb-4">${window.db.formatPrice(product.price)}</div>
                    <button onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''} 
                        class="w-full btn-primary py-2.5 rounded-xl font-medium text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    const featured = window.db.products.slice(0, 4);
    container.innerHTML = featured.map(generateProductCard).join('');
}

function renderProducts(productsToRender) {
    const container = document.getElementById('product-grid');
    if (!container) return;
    container.innerHTML = productsToRender.map(generateProductCard).join('');
}

// Render Cart Page
function renderCart() {
    const container = document.getElementById('cart-items');
    const summaryContainer = document.getElementById('cart-summary');
    if (!container || !summaryContainer) return;

    if (cart.length === 0) {
        container.innerHTML = `<div class="p-8 text-center text-slate-400 glass rounded-2xl">Your cart is empty. <br><a href="shop.html" class="text-sky-400 mt-4 inline-block hover:underline">Continue Shopping</a></div>`;
        summaryContainer.innerHTML = '';
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        subtotal += item.price * item.quantity;
        return `
            <div class="glass p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 mb-4">
                <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-xl bg-slate-800">
                <div class="flex-grow text-center sm:text-left">
                    <h3 class="font-bold text-lg">${item.name}</h3>
                    <div class="text-sky-400 font-medium">${window.db.formatPrice(item.price)}</div>
                </div>
                <div class="flex items-center gap-3 bg-slate-800/50 rounded-lg p-1">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-700 transition">-</button>
                    <span class="w-8 text-center font-medium">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-700 transition">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:text-red-300 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        `;
    }).join('');

    const tax = subtotal * 0.05; // 5% mock tax
    const total = subtotal + tax;

    summaryContainer.innerHTML = `
        <div class="glass p-6 rounded-2xl sticky top-24">
            <h3 class="text-xl font-heading font-bold mb-6">Order Summary</h3>
            <div class="flex justify-between mb-4 text-slate-300">
                <span>Subtotal</span>
                <span>${window.db.formatPrice(subtotal)}</span>
            </div>
            <div class="flex justify-between mb-6 text-slate-300">
                <span>Tax (5%)</span>
                <span>${window.db.formatPrice(tax)}</span>
            </div>
            <div class="flex justify-between mb-8 text-xl font-bold border-t border-slate-700 pt-4">
                <span>Total</span>
                <span class="text-sky-400">${window.db.formatPrice(total)}</span>
            </div>
            <a href="checkout.html" class="w-full btn-primary py-3 rounded-xl font-bold text-center block">Proceed to Checkout</a>
        </div>
    `;
}
