<script setup>
import { computed, onMounted, ref } from 'vue'
import ProductArtwork from '../components/ProductArtwork.vue'
import { useCart } from '../composables/useCart.js'
import { sampleProducts, useMarketplaceProducts } from '../composables/useMarketplaceProducts.js'

const { products, loadProducts } = useMarketplaceProducts()
const { addToCart } = useCart()
const search = ref('')
const errorMessage = ref('')
const allProducts = computed(() => [...sampleProducts, ...products.value])
const results = computed(() => {
    const query = search.value.trim().toLowerCase()
    if (!query) return allProducts.value

    return allProducts.value.filter(product => [
        product.name,
        product.condition,
        product.type,
        product.description,
        product.type === 'For Rent' ? `${product.rentalRatePerDay} per day` : '',
        product.type === 'For Rent' ? `${product.minRentalDays} days` : '',
        product.type === 'For Rent' ? `${product.maxRentalDays} days` : ''
    ].some(value => String(value ?? '').toLowerCase().includes(query)))
})

function retryPage() {
    window.location.reload()
}

function viewProduct(product) {
    return { path: '/item', query: { id: product.id } }
}

onMounted(() => {
    try {
        loadProducts()
    } catch {
        errorMessage.value = 'Marketplace listings could not be loaded. Your data has not been changed.'
    }
})
</script>

<template>
    <main class="app-page">
        <p class="section-kicker">FIND A LOCAL FAVORITE</p>
        <h1 class="page-heading">Search the marketplace</h1>
        <p class="page-subtitle">Browse local items for sale, trade, or rent.</p>

        <label class="search-field surface-card">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>
            <span class="visually-hidden">Search listings by name, condition, type, or description</span>
            <input v-model="search" placeholder="What are you looking for?">
            <button v-if="search" type="button" aria-label="Clear search" @click="search = ''">×</button>
        </label>

        <div v-if="errorMessage" class="error-message" role="alert">
            <p>{{ errorMessage }}</p>
            <button class="error-retry" type="button" @click="retryPage">Reload listings</button>
        </div>

        <div class="results-heading">
            <h2>{{ search ? 'Search results' : 'All local finds' }}</h2>
            <span>{{ results.length }} {{ results.length === 1 ? 'listing' : 'listings' }}</span>
        </div>

        <div v-if="results.length" class="results-grid">
            <RouterLink v-for="product in results" :key="product.id" class="result-card surface-card" :to="viewProduct(product)">
                <ProductArtwork :product="product" />
                <div class="result-info">
                    <p class="product-type">{{ product.type }} <span>·</span> {{ product.condition }}</p>
                    <h3>{{ product.name }}</h3>
                    <p class="product-description">{{ product.description || 'A lovely local find, ready for a new home.' }}</p>
                    <p v-if="product.type === 'For Trade'" class="trade-note">Can be traded (through another product)</p>
                    <p v-else-if="product.type === 'For Rent'" class="trade-note">
                        {{ product.minRentalDays }}–{{ product.maxRentalDays }} days · return by {{ product.returnByTime }}
                    </p>
                    <div class="result-footer">
                        <strong>
                            {{ product.type === 'For Trade' ? 'Can be traded (through another product)' : `₱${Number(product.type === 'For Rent' ? product.rentalRatePerDay ?? product.price : product.price).toLocaleString('en-PH')}${product.type === 'For Rent' ? ' / day' : ''}` }}
                        </strong>
                        <button type="button" class="cart-button" @click.stop="addToCart(product)">Add to cart</button>
                        <span class="secondary-button">View item</span>
                    </div>
                </div>
            </RouterLink>
        </div>
        <div v-else class="empty-state surface-card">
            <h2>No matching listings</h2>
            <p>Try a different word, or clear your search to see all local finds.</p>
            <button class="secondary-button" type="button" @click="search = ''">Clear search</button>
        </div>
    </main>
</template>

<style scoped>
.search-field {
    display: flex;
    align-items: center;
    gap: 11px;
    margin-top: 21px;
    padding: 7px 14px;
    border-radius: 14px;
}

.search-field svg {
    width: 20px;
    flex: 0 0 auto;
    fill: none;
    stroke: #6b835d;
    stroke-linecap: round;
    stroke-width: 1.8;
}

.search-field input {
    width: 100%;
    min-height: 42px;
    border: 0;
    outline: 0;
    background: transparent;
    color: #304837;
    font-size: 14px;
}

.search-field input:focus-visible {
    outline: 0;
}

.search-field button {
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    background: #eff1e5;
    color: #516a49;
    font-size: 21px;
    cursor: pointer;
}

.results-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px 0 14px;
}

.results-heading h2 {
    margin: 0;
    color: #456149;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 21px;
    font-weight: 500;
}

.results-heading span {
    color: #7e8a72;
    font-size: 11px;
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 15px;
}

.result-card {
    display: block;
    overflow: hidden;
    padding: 10px;
    color: inherit;
    text-decoration: none;
}

.result-info {
    padding: 11px 3px 3px;
}

.product-type {
    margin: 0 0 5px;
    color: #647354;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
}

.product-type span {
    padding: 0 3px;
}

.result-info h3 {
    margin: 0;
    color: #354b37;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 18px;
}

.product-description {
    min-height: 36px;
    margin: 6px 0 12px;
    color: #5e6c58;
    font-size: 11px;
    line-height: 1.5;
}

.trade-note {
    margin: -5px 0 12px;
    color: #4f704b;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.45;
}

.result-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.result-footer strong {
    color: #426847;
    font-size: 13px;
}

.result-footer strong {
    max-width: 62%;
    line-height: 1.35;
}

.result-footer .secondary-button {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 11px;
    font-size: 11px;
}

.cart-button {
    min-height: 36px;
    flex: 0 0 auto;
    padding: 0 10px;
    border: 1px solid #d8e0ca;
    border-radius: 999px;
    background: #fff;
    color: #416a49;
    font: inherit;
    font-size: 10px;
    font-weight: 750;
    cursor: pointer;
    transition: background-color 150ms ease, transform 150ms ease;
}

.cart-button:hover:not(:disabled) {
    transform: translateY(-1px);
    background: #f0f3e4;
}

.empty-state {
    margin-top: 13px;
}

.error-message p {
    margin: 0 0 7px;
}

.error-retry {
    min-height: 40px;
    padding: 0;
    border: 0;
    background: transparent;
    color: #793b33;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
}

@media (max-width: 760px) {
    .results-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 490px) {
    .results-grid {
        grid-template-columns: 1fr;
    }
}
</style>
