<script setup>
import { ref } from 'vue'
import ProductArtwork from '../components/ProductArtwork.vue'
import { useCart } from '../composables/useCart.js'

const { cartItems, cartCount, cartTotal, removeFromCart, clearCart } = useCart()
const notice = ref('')

function itemPriceLabel(item) {
    if (item.type === 'For Rent') {
        return `₱${Number(item.unitPrice).toLocaleString('en-PH')} / day`
    }
    if (item.type === 'For Trade') {
        return 'Trade'
    }
    return `₱${Number(item.unitPrice).toLocaleString('en-PH')}`
}

function itemLineTotal(item) {
    if (item.type === 'For Trade') return '—'
    return `₱${Number(item.unitPrice).toLocaleString('en-PH')}`
}

function removeItem(item) {
    if (!window.confirm(`Remove "${item.name}" from your cart?`)) return
    notice.value = ''
    removeFromCart(item.id)
}

function clearAll() {
    if (!window.confirm('Clear every item from your cart?')) return
    clearCart()
    notice.value = 'Your cart is now empty.'
}
</script>

<template>
    <main class="app-page">
        <p class="section-kicker">YOUR CART</p>
        <h1 class="page-heading">Your cart</h1>
        <p class="page-subtitle">Items you’re interested in will be easy to find here.</p>

        <p v-if="notice" class="status-message" role="status">{{ notice }}</p>

        <section v-if="cartCount" class="cart-checkout">
            <ul class="cart-list">
                <li v-for="item in cartItems" :key="item.id" class="cart-item surface-card">
                    <div class="cart-item-media">
                        <ProductArtwork :product="item" />
                    </div>
                    <div class="cart-item-info">
                        <h3>{{ item.name }}</h3>
                        <p class="product-type">{{ item.type }} <span>·</span> {{ item.condition || 'Pre-loved' }}</p>
                        <p class="item-price">{{ itemPriceLabel(item) }}</p>
                        <RouterLink class="secondary-button" to="/messages">Contact seller</RouterLink>
                    </div>
                    <div class="cart-item-sum">
                        <strong class="item-line-total">{{ itemLineTotal(item) }}</strong>
                        <button type="button" class="remove-btn" aria-label="Remove from cart" title="Remove from cart" @click="removeItem(item)">✕</button>
                    </div>
                </li>
            </ul>

            <div class="cart-summary surface-card">
                <div class="summary-row">
                    <span>Total items</span>
                    <strong>{{ cartCount }}</strong>
                </div>
                <div class="summary-row">
                    <span>Estimated total</span>
                    <strong>₱{{ Number(cartTotal).toLocaleString('en-PH') }}</strong>
                </div>
                <p class="cart-note">Contact each seller to arrange a sale, trade, or rental.</p>
                <div class="cart-actions">
                    <button type="button" class="danger-button" @click="clearAll">Clear cart</button>
                </div>
            </div>
        </section>

        <section v-else class="empty-state surface-card cart-card">
            <span class="cart-icon" aria-hidden="true">🧺</span>
            <h2>Your cart is taking a little breather</h2>
            <p>Checkout is not available yet. Explore the marketplace and find a local item you love.</p>
            <RouterLink class="primary-button" to="/search">Browse local finds</RouterLink>
        </section>
    </main>
</template>

<style scoped>
.cart-checkout {
    display: grid;
    gap: 16px;
    margin-top: 23px;
}

.cart-list {
    display: grid;
    gap: 14px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.cart-item {
    display: grid;
    grid-template-columns: 90px minmax(0, 1fr) 110px;
    align-items: start;
    gap: 14px;
    padding: 12px;
}

.cart-item-media {
    width: 100%;
}

.cart-item-media :deep(.product-artwork) {
    aspect-ratio: 1 / 1;
    border-radius: 12px;
}

.cart-item-info h3 {
    margin: 0 0 4px;
    color: #354b37;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 17px;
    font-weight: 600;
}

.product-type {
    margin: 0 0 6px;
    color: #71806a;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
}

.product-type span {
    padding: 0 4px;
    color: #b3b99b;
}

.item-price {
    margin: 5px 0 11px;
    color: #426847;
    font-size: 13px;
    font-weight: 700;
}

.cart-item-sum {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 8px;
}

.item-line-total {
    color: #426847;
    font-size: 14px;
}

.remove-btn {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: rgba(148, 82, 70, 0.1);
    color: #945246;
    font-size: 15px;
    cursor: pointer;
}

.remove-btn:hover {
    background: rgba(148, 82, 70, 0.2);
}

.cart-summary {
    padding: 19px 22px;
}

.summary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 9px;
}

.summary-row strong {
    color: #35513a;
    font-size: 15px;
}

.cart-note {
    margin: 5px 0 15px;
    color: #7a886f;
    font-size: 11px;
    font-style: italic;
}

.cart-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
}

.cart-actions .primary-button[disabled] {
    opacity: 0.55;
    cursor: not-allowed;
}

.cart-card {
    margin-top: 23px;
    padding: 48px 24px;
}

.cart-icon {
    display: block;
    margin-bottom: 12px;
    font-size: 31px;
}

.cart-card p {
    max-width: 450px;
    margin: 9px auto 17px;
}

@media (max-width: 560px) {
    .cart-item {
        grid-template-columns: 76px minmax(0, 1fr);
        gap: 12px;
    }

    .cart-item-sum {
        grid-column: 1 / -1;
    }

    .cart-summary {
        padding: 16px 18px;
    }
}
</style>
