<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const emoji = computed(() => {
    if (props.product.icon) return props.product.icon
    const name = props.product.name.toLowerCase()
    if (name.includes('shoe') || name.includes('sneaker')) return '👟'
    if (name.includes('playstation') || name.includes('console') || name.includes('game')) return '🎮'
    if (name.includes('bag') || name.includes('backpack')) return '🎒'
    if (name.includes('book')) return '📚'
    if (name.includes('bike') || name.includes('bicycle')) return '🚲'
    if (name.includes('phone') || name.includes('iphone')) return '📱'
    if (name.includes('bottle')) return '🧴'
    if (name.includes('umbrella')) return '☂️'
    if (name.includes('lamp')) return '💡'
    if (name.includes('plant')) return '🪴'
    if (name.includes('canon') || name.includes('camera')) return '📷'
    if (name.includes('vacuum')) return '🧹'
    if (name.includes('drone')) return '🚁'
    if (name.includes('sound') || name.includes('speaker')) return '🔊'
    if (name.includes('ebike') || name.includes('e-bike')) return '🚲'
    return props.product.type === 'For Trade' ? '🌿' : '🧺'
})
const imageFailed = ref(false)

watch(() => props.product.image, () => {
    imageFailed.value = false
})
</script>

<template>
    <div class="product-artwork" :class="{ 'has-photo': product.image && !imageFailed }">
        <img
            v-if="product.image && !imageFailed"
            :src="product.image"
            :alt="product.name"
            loading="lazy"
            decoding="async"
            @error="imageFailed = true"
        >
        <span v-else aria-hidden="true">{{ emoji }}</span>
    </div>
</template>

<style scoped>
.product-artwork {
    display: grid;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    place-items: center;
    border-radius: 15px;
    background:
        radial-gradient(ellipse at 50% 100%, rgba(195, 215, 156, 0.86) 0 19%, transparent 20%),
        radial-gradient(ellipse at 5% 100%, rgba(139, 169, 111, 0.68) 0 28%, transparent 29%),
        linear-gradient(145deg, #e8edd4, #d4e2be 64%, #c1d49e);
}

.product-artwork span {
    display: grid;
    width: 82px;
    height: 82px;
    place-items: center;
    border: 1px solid rgba(255, 255, 241, 0.8);
    border-radius: 50%;
    background: rgba(250, 250, 230, 0.72);
    box-shadow: 0 9px 22px rgba(63, 84, 47, 0.13);
    font-size: 42px;
}

.product-artwork img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.product-artwork.has-photo {
    background: #e7eadb;
}
</style>
