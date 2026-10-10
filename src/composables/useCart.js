import { ref, computed } from 'vue'

const STORAGE_KEY = 'cart'

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) return parsed
        }
    } catch {
        return []
    }
    return []
}

function saveToStorage(items) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
        return
    }
}

function cartItemFor(product) {
    const isRental = product.type === 'For Rent'
    const unitPrice = Number(
        isRental
            ? product.rentalRatePerDay ?? product.price ?? 0
            : product.price ?? 0
    )

    return {
        id: product.id,
        name: product.name,
        image: product.image ?? '',
        type: product.type ?? '',
        condition: product.condition ?? '',
        isRental,
        unitPrice
    }
}

const cartItems = ref(loadFromStorage())

export function useCart() {
    const cartCount = computed(() =>
        cartItems.value.length
    )

    const cartTotal = computed(() =>
        cartItems.value.reduce((sum, item) => sum + item.unitPrice, 0)
    )

    function findItem(productId) {
        return cartItems.value.find(item => item.id === productId)
    }

    function addToCart(product) {
        if (findItem(product.id)) return

        cartItems.value.push(cartItemFor(product))
        saveToStorage(cartItems.value)
    }

    function removeFromCart(productId) {
        const index = cartItems.value.findIndex(item => item.id === productId)
        if (index !== -1) {
            cartItems.value.splice(index, 1)
            saveToStorage(cartItems.value)
        }
    }

    function clearCart() {
        cartItems.value = []
        saveToStorage(cartItems.value)
    }

    function isInCart(productId) {
        return Boolean(findItem(productId))
    }

    return {
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart
    }
}
