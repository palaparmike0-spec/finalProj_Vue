<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductArtwork from '../components/ProductArtwork.vue'
import { useCart } from '../composables/useCart.js'
import { sampleProducts, useMarketplaceProducts } from '../composables/useMarketplaceProducts.js'

const route = useRoute()
const { products, loadProducts } = useMarketplaceProducts()
const { addToCart } = useCart()
const errorMessage = ref('')
const allProducts = computed(() => [...sampleProducts, ...products.value])
const product = computed(() => {
    if (typeof route.query.id === 'string') {
        return allProducts.value.find(item => item.id === route.query.id) ?? null
    }

    if (typeof route.query.name === 'string') {
        const sampleProduct = sampleProducts.find(item => item.name === route.query.name)
        return sampleProduct ?? {
            id: 'browse-item',
            name: route.query.name,
            price: Number(route.query.price),
            condition: route.query.condition ?? '',
            type: route.query.type ?? '',
            description: route.query.description ?? '',
            details: '',
            image: ''
        }
    }
    return null
})
const detailedDescription = computed(() => {
    if (!product.value) return ''
    if (product.value.details) return product.value.details

    const summary = product.value.description?.trim()
    const followUp = product.value.type === 'For Trade'
        ? 'Can be traded (through another product). Contact the seller to discuss a fair exchange and arrange a local handoff.'
        : product.value.type === 'For Rent'
            ? 'Review the rental duration, daily return deadline, and deposit with the owner before pickup. Confirm the equipment condition and what accessories are included.'
        : 'Contact the seller to ask any questions, confirm the item condition, and arrange a local handoff.'

    return [summary, followUp].filter(Boolean).join('\n\n')
})
const rentalDeadline = computed(() => {
    if (!product.value?.availableUntil) return ''
    const date = new Date(`${product.value.availableUntil}T00:00:00`)
    if (Number.isNaN(date.getTime())) return product.value.availableUntil
    return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
})

onMounted(() => {
    try {
        loadProducts()
    } catch {
        errorMessage.value = 'This listing could not be loaded. Your saved marketplace data has not been changed.'
    }
})
</script>

<template>
    <main class="app-page">
        <p class="section-kicker">A COMMUNITY FIND</p>
        <h1 class="page-heading">Item details</h1>
        <div v-if="errorMessage" class="error-message" role="alert">
            <p>{{ errorMessage }}</p>
            <RouterLink to="/">Return to marketplace</RouterLink>
        </div>

        <section v-else-if="product" class="detail-card surface-card">
            <ProductArtwork :product="product" />
            <div class="detail-info">
                <p class="section-kicker">{{ product.type }} <span v-if="product.condition">· {{ product.condition }}</span></p>
                <h2>{{ product.name }}</h2>
                <p v-if="product.type === 'For Sale'" class="detail-price">₱{{ Number(product.price).toLocaleString('en-PH') }}</p>
                <p v-else-if="product.type === 'For Rent'" class="detail-price">₱{{ Number(product.rentalRatePerDay ?? product.price).toLocaleString('en-PH') }} <span>per day</span></p>
                <p v-else class="trade-badge">Can be traded through another product</p>
                <dl v-if="product.type === 'For Rent'" class="rental-terms">
                    <div>
                        <dt>Rental duration</dt>
                        <dd>{{ product.minRentalDays ?? 1 }}–{{ product.maxRentalDays ?? 1 }} days</dd>
                    </div>
                    <div>
                        <dt>Return by</dt>
                        <dd>{{ product.returnByTime || 'Agree with owner' }}</dd>
                    </div>
                    <div>
                        <dt>Security deposit</dt>
                        <dd>{{ Number(product.securityDeposit ?? 0) ? `₱${Number(product.securityDeposit).toLocaleString('en-PH')}` : 'None specified' }}</dd>
                    </div>
                    <div v-if="rentalDeadline">
                        <dt>Available until</dt>
                        <dd>{{ rentalDeadline }}</dd>
                    </div>
                </dl>
                <p class="detail-description">{{ detailedDescription }}</p>
                <p class="local-note"><span aria-hidden="true">⌖</span> Shared by someone in the Tubigon community</p>
                <div class="detail-actions">
                    <button type="button" class="secondary-button" @click="addToCart(product)">Add to cart</button>
                    <RouterLink class="primary-button" to="/messages">Contact seller</RouterLink>
                    <RouterLink class="secondary-button" to="/">Back to marketplace</RouterLink>
                </div>
            </div>
        </section>

        <section v-else class="empty-state surface-card">
            <h2>We couldn’t find that listing</h2>
            <p>It may have been removed or the link may be out of date.</p>
            <RouterLink class="primary-button" to="/">Browse marketplace</RouterLink>
        </section>
    </main>
</template>

<style scoped>
.detail-card {
    display: grid;
    grid-template-columns: minmax(230px, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(20px, 4vw, 38px);
    margin-top: 19px;
    padding: clamp(16px, 3vw, 26px);
}

.detail-card :deep(.product-artwork),
.detail-card :deep(.product-artwork img) {
    align-self: start;
}

.detail-info {
    align-self: center;
}

.detail-info h2 {
    margin: 0;
    color: #354b37;
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(25px, 4vw, 36px);
    font-weight: 500;
}

.detail-price {
    margin: 13px 0;
    color: #426847;
    font-size: 19px;
    font-weight: 800;
}

.detail-price span {
    color: #6c7c63;
    font-size: 13px;
    font-weight: 600;
}

.rental-terms {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 11px;
    margin: 15px 0;
    padding: 14px;
    border: 1px solid #dce4d1;
    border-radius: 14px;
    background: #f5f6e9;
}

.rental-terms dt {
    color: #728064;
    font-size: 10px;
    font-weight: 650;
}

.rental-terms dd {
    margin: 4px 0 0;
    color: #36513a;
    font-size: 12px;
    font-weight: 750;
}

.trade-badge {
    width: fit-content;
    margin: 13px 0;
    padding: 9px 12px;
    border: 1px solid #cfddc2;
    border-radius: 999px;
    background: #edf2e3;
    color: #466648;
    font-size: 12px;
    font-weight: 750;
}

.detail-description {
    white-space: pre-line;
    color: #71806a;
    font-size: 14px;
    line-height: 1.7;
}

.local-note {
    margin: 17px 0;
    color: #7a886f;
    font-size: 12px;
}

.local-note span {
    padding-right: 4px;
    color: #638257;
}

.detail-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
}

.error-message p {
    margin: 0 0 7px;
}

.error-message a {
    color: #793b33;
    font-size: 12px;
    font-weight: 700;
}

.empty-state {
    margin-top: 20px;
}

@media (max-width: 650px) {
    .detail-card {
        grid-template-columns: 1fr;
    }

}
</style>
