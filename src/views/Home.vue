<script setup>
import { computed, onMounted, ref } from 'vue'
import ProductArtwork from '../components/ProductArtwork.vue'
import { useCart } from '../composables/useCart.js'
import { sampleProducts, useMarketplaceProducts } from '../composables/useMarketplaceProducts.js'

const { products, loadProducts } = useMarketplaceProducts()
const { addToCart } = useCart()
const storageError = ref('')
const shelfRefs = ref({})
const allProducts = computed(() => [...sampleProducts, ...products.value])
const saleProducts = computed(() => allProducts.value.filter(product => product.type === 'For Sale'))
const tradeProducts = computed(() => allProducts.value.filter(product => product.type === 'For Trade'))
const rentalProducts = computed(() => allProducts.value.filter(product => product.type === 'For Rent'))

function scrollShelf(shelf) {
    shelfRefs.value[shelf]?.scrollBy({ left: 320, behavior: 'smooth' })
}

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
        storageError.value = 'Saved marketplace listings could not be loaded. Your data has not been changed.'
    }
})
</script>

<template>
    <main class="app-page home-content">
        <section class="welcome surface-card">
            <div class="welcome-copy">
                <p class="section-kicker">A LITTLE CLOSER TO HOME</p>
                <h1 class="page-heading">Welcome to<br><span>Tubigon's Marketplace</span></h1>
                <p class="page-subtitle">Find a good thing. Share a good thing. All right here in Tubigon Bohol.</p>
                <RouterLink class="primary-button" to="/post-item"><span aria-hidden="true">＋</span> Post an item</RouterLink>
            </div>
            <div class="welcome-decoration" aria-hidden="true"><span>✦</span><span>✧</span></div>
        </section>

        <div v-if="storageError" class="error-message" role="alert">
            <p>{{ storageError }}</p>
            <button class="error-retry" type="button" @click="retryPage">Reload listings</button>
        </div>

        <section class="shelves" aria-label="Marketplace items">
            <section class="shelf-section" aria-labelledby="sales-title">
                <div class="shelf-heading">
                    <div>
                        <p class="section-kicker">GOOD FINDS, GOOD PRICES</p>
                        <h2 id="sales-title">For sale <span class="shelf-count">{{ saleProducts.length }}</span></h2>
                    </div>
                    <button class="shelf-arrow" type="button" aria-label="Scroll sale listings right" @click="scrollShelf('sales')">→</button>
                </div>
                <div v-if="saleProducts.length" :ref="element => shelfRefs.sales = element" class="product-shelf">
                    <RouterLink v-for="(product, index) in saleProducts" :key="product.id" class="product-card surface-card" :to="viewProduct(product)">
                        <div class="product-image">
                            <ProductArtwork :product="product" />
                            <span class="product-ribbon">{{ index === 0 ? 'LOCAL FIND' : 'FOR SALE' }}</span>
                        </div>
                        <div class="product-info">
                            <p class="product-condition">{{ product.condition || 'Pre-loved' }} <span>·</span> Tubigon</p>
                            <h3>{{ product.name }}</h3>
                            <p class="product-description">{{ product.description || 'A lovely local find, ready for a new home.' }}</p>
                            <div class="product-footer">
                                <strong>₱{{ Number(product.price).toLocaleString('en-PH') }}</strong>
                                <button type="button" class="cart-button" @click.stop="addToCart(product)">Add to cart</button>
                                <span class="view-button">View item <span aria-hidden="true">↗</span></span>
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <div v-else class="empty-state">
                    <h3>No sale items just yet</h3>
                    <p>Be the first to share a good find with the community.</p>
                    <RouterLink class="primary-button" to="/post-item">Post a sale item</RouterLink>
                </div>
            </section>

            <section class="shelf-section trade-section" aria-labelledby="trades-title">
                <div class="shelf-heading">
                    <div>
                        <p class="section-kicker">SOMETHING FOR SOMETHING</p>
                        <h2 id="trades-title">Items to trade <span class="shelf-count">{{ tradeProducts.length }}</span></h2>
                    </div>
                    <button class="shelf-arrow" type="button" aria-label="Scroll trade listings right" @click="scrollShelf('trades')">→</button>
                </div>
                <div v-if="tradeProducts.length" :ref="element => shelfRefs.trades = element" class="product-shelf">
                    <RouterLink v-for="(product, index) in tradeProducts" :key="product.id" class="product-card surface-card" :to="viewProduct(product)">
                        <div class="product-image">
                            <ProductArtwork :product="product" />
                            <span class="product-ribbon trade-ribbon">FOR TRADE</span>
                        </div>
                        <div class="product-info">
                            <p class="product-condition">{{ product.condition || 'Pre-loved' }} <span>·</span> Tubigon</p>
                            <h3>{{ product.name }}</h3>
                            <p class="product-description">{{ product.description || 'Open to a fair trade with someone nearby.' }}</p>
                            <div class="product-footer">
                                <strong class="trade-price">Can be traded (through another product)</strong>
                                <button type="button" class="cart-button" @click.stop="addToCart(product)">Add to cart</button>
                                <span class="view-button">View item <span aria-hidden="true">↗</span></span>
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <div v-else class="empty-state">
                    <h3>No trade items just yet</h3>
                    <p>Find a neighbor to trade something useful with.</p>
                    <RouterLink class="primary-button" to="/post-item">Post a trade item</RouterLink>
                </div>
            </section>

            <section class="shelf-section rental-section" aria-labelledby="rentals-title">
                <div class="shelf-heading">
                    <div>
                        <p class="section-kicker">BORROW IT FOR A WHILE</p>
                        <h2 id="rentals-title">For rent <span class="shelf-count">{{ rentalProducts.length }}</span></h2>
                    </div>
                    <button class="shelf-arrow" type="button" aria-label="Scroll rental listings right" @click="scrollShelf('rentals')">→</button>
                </div>
                <div v-if="rentalProducts.length" :ref="element => shelfRefs.rentals = element" class="product-shelf">
                    <RouterLink v-for="product in rentalProducts" :key="product.id" class="product-card surface-card" :to="viewProduct(product)">
                        <div class="product-image">
                            <ProductArtwork :product="product" />
                            <span class="product-ribbon rental-ribbon">FOR RENT</span>
                        </div>
                        <div class="product-info">
                            <p class="product-condition">{{ product.condition || 'Pre-loved' }} <span>·</span> Tubigon</p>
                            <h3>{{ product.name }}</h3>
                            <p class="product-description">{{ product.description || 'Available to rent from a local owner.' }}</p>
                            <p class="rental-card-terms">
                                {{ product.minRentalDays }}–{{ product.maxRentalDays }} days
                                <span v-if="product.returnByTime">· return by {{ product.returnByTime }}</span>
                            </p>
                            <div class="product-footer">
                                <strong class="rental-rate">₱{{ Number(product.rentalRatePerDay ?? product.price).toLocaleString('en-PH') }} / day</strong>
                                <button type="button" class="cart-button" @click.stop="addToCart(product)">Add to cart</button>
                                <span class="view-button">View item <span aria-hidden="true">↗</span></span>
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <div v-else class="empty-state">
                    <h3>No rental items just yet</h3>
                    <p>List useful equipment or items for your neighbors to borrow.</p>
                    <RouterLink class="primary-button" to="/post-item">Post a rental</RouterLink>
                </div>
            </section>
        </section>
    </main>
</template>

<style scoped>
.home-content {
    padding-top: 94px;
}

.welcome {
    position: relative;
    min-height: 280px;
    overflow: hidden;
    padding: 37px clamp(22px, 5vw, 48px);
    border-color: rgba(31, 32, 3, 0.72);
    background:
        linear-gradient(90deg, rgba(247, 248, 230, 0.96) 0%, rgba(239, 243, 211, 0.91) 54%, rgba(223, 234, 195, 0.52) 100%),
        url("../assets/images/products/tubigonplaza.jpeg") center 55% / cover;
}

.welcome-copy {
    position: relative;
    z-index: 1;
    max-width: 580px;
}

.welcome .page-heading span {
    color: #688053;
    font-style: italic;
}

.welcome .page-subtitle {
    max-width: 390px;
    margin: 13px 0 17px;
}

.welcome-decoration span {
    position: absolute;
    color: rgba(79, 112, 67, 0.25);
    font-family: Georgia, serif;
}

.welcome-decoration span:first-child {
    right: 12%;
    bottom: 14%;
    font-size: 80px;
    transform: rotate(-20deg);
}

.welcome-decoration span:last-child {
    top: 14%;
    right: 25%;
    font-size: 38px;
    transform: rotate(15deg);
}

.shelves {
    padding-top: 30px;
}

.shelf-section + .shelf-section {
    margin-top: 27px;
}

.shelf-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 15px;
}

.shelf-heading .section-kicker {
    margin-bottom: 6px;
}

.shelf-heading h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    color: #35513a;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 25px;
    font-weight: 500;
}

.shelf-count {
    display: inline-grid;
    min-width: 23px;
    height: 23px;
    place-items: center;
    border: 1px solid rgba(94, 124, 74, 0.2);
    border-radius: 50%;
    background: rgba(247, 248, 231, 0.86);
    color: #70815b;
    font: 700 11px "Avenir Next", Avenir, sans-serif;
}

.shelf-arrow {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid rgba(78, 107, 69, 0.2);
    border-radius: 50%;
    background: rgba(248, 249, 237, 0.85);
    color: #476647;
    font-size: 19px;
    cursor: pointer;
}

.product-shelf {
    display: grid;
    grid-auto-columns: minmax(230px, 278px);
    grid-auto-flow: column;
    gap: 16px;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    padding: 2px 2px 14px;
    scroll-snap-type: x mandatory;
    scrollbar-color: rgba(87, 119, 70, 0.42) transparent;
    scrollbar-width: thin;
}

.product-card {
    display: block;
    min-width: 0;
    overflow: hidden;
    padding: 10px;
    border-radius: 18px;
    color: inherit;
    scroll-snap-align: start;
    text-decoration: none;
    transition: transform 170ms ease, box-shadow 170ms ease;
}

.product-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 28px rgba(39, 62, 40, 0.16);
}

.product-image {
    position: relative;
}

.product-image :deep(.product-artwork) {
    border-radius: 13px;
}

.product-ribbon {
    position: absolute;
    top: 9px;
    left: 9px;
    padding: 6px 9px;
    border: 1px solid rgba(255, 255, 241, 0.7);
    border-radius: 999px;
    background: rgba(250, 250, 231, 0.88);
    color: #4e704a;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 1px;
}

.trade-ribbon {
    background: rgba(78, 112, 75, 0.88);
    color: #fffced;
}

.rental-ribbon {
    background: rgba(248, 236, 208, 0.94);
    color: #785a2c;
}

.product-info {
    padding: 12px 5px 4px;
}

.product-condition {
    margin: 0 0 6px;
    color: #647354;
    font-size: 10px;
    font-weight: 650;
    letter-spacing: 0.4px;
    text-transform: uppercase;
}

.product-condition span {
    margin: 0 4px;
    color: #b3b99b;
}

.product-info h3 {
    overflow: hidden;
    margin: 0;
    color: #354b37;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 18px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.product-description {
    display: -webkit-box;
    min-height: 35px;
    overflow: hidden;
    margin: 6px 0 12px;
    color: #5e6c58;
    font-size: 11px;
    line-height: 1.55;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.product-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.product-footer strong {
    color: #426847;
    font-size: 16px;
}

.product-footer .trade-price {
    max-width: 130px;
    font-size: 10px;
    line-height: 1.35;
}

.rental-card-terms {
    margin: -4px 0 11px;
    color: #6a7658;
    font-size: 10px;
    font-weight: 650;
}

.product-footer .rental-rate {
    color: #785a2c;
}

.view-button {
    display: inline-flex;
    min-height: 40px;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    padding: 7px 10px;
    border: 1px solid #d8e0ca;
    border-radius: 999px;
    background: #f0f3e4;
    color: #456648;
    font: inherit;
    font-size: 10px;
    font-weight: 750;
    cursor: pointer;
}

.view-button span {
    margin-left: 3px;
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

.cart-button:active {
    transform: translateY(0);
}

.empty-state {
    padding: 27px 20px;
}

.empty-state h3 {
    font-size: 19px;
}

.empty-state p {
    margin-bottom: 14px;
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
    .home-content {
        padding-top: 82px;
    }

    .product-shelf {
        grid-auto-columns: minmax(218px, 72vw);
        gap: 13px;
        margin-right: -14px;
        padding-right: 14px;
    }
}

@media (max-width: 560px) {
    .home-content {
        width: calc(100% - 28px);
        padding-top: 76px;
    }

    .welcome {
        min-height: 228px;
        padding: 25px 20px;
        border-radius: 21px;
        background-position: center, 61% center;
    }

    .welcome .page-heading {
        font-size: clamp(31px, 9vw, 42px);
        letter-spacing: -1.2px;
    }

    .welcome .page-subtitle {
        max-width: 290px;
        font-size: 12px;
    }

    .welcome-decoration span:first-child {
        right: 7%;
        bottom: 8%;
        font-size: 56px;
    }

    .welcome-decoration span:last-child {
        right: 18%;
        font-size: 28px;
    }

    .shelves {
        padding-top: 24px;
    }

    .shelf-heading h2 {
        font-size: 22px;
    }
}
</style>
