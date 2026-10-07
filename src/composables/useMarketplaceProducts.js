import { ref } from 'vue'
import iphoneImage from '../assets/images/products/iphone11.webp'
import shoesImage from '../assets/images/products/nike shoe.jpg'
import playstationImage from '../assets/images/products/playstation4.jpg'
import backpackImage from '../assets/images/products/backpack.jpg'
import novelImage from '../assets/images/products/novel.webp'
import bicycleImage from '../assets/images/products/bicycle.jpg'
import waterBottleImage from '../assets/images/products/waterbottle.png'
import umbrellaImage from '../assets/images/products/foldingUmbrella.jpg'
import deskLampImage from '../assets/images/products/deskLamp.jpg'
import pottedPlantImage from '../assets/images/products/pottedPlant.jpg'
import canonCameraImage from '../assets/images/products/canoncamera.jpg'
import vacuumCleanerImage from '../assets/images/products/vacuumCleaner.jpg'
import droneImage from '../assets/images/products/drone.jpg'
import soundSystemImage from '../assets/images/products/soundSystem.jpg'
import ebikeImage from '../assets/images/products/ebike.jpg'

const STORAGE_KEY = 'products'
const products = ref([])
let isLoaded = false

export const sampleProducts = [
    {
        id: 'sample-iphone',
        name: 'Iphone 11',
        price: 12000,
        condition: 'Good',
        type: 'For Sale',
        description: 'A dependable phone ready for a new owner.',
        details: 'This iPhone 11 is in good condition and ready for everyday use. It is listed for ₱12,000. Review the photos and condition, then contact the seller to ask about the item and arrange a local handoff.',
        image: iphoneImage
    },
    {
        id: 'sample-shoes',
        name: 'Nike Shoes',
        price: 1500,
        condition: 'New',
        type: 'For Trade',
        description: 'Brand-new shoes available for trade.',
        details: 'These Nike shoes are new and available for a product-for-product exchange. Can be traded (through another product). Contact the seller to discuss what you would like to offer and agree on a fair local swap.',
        image: shoesImage
    },
    {
        id: 'sample-playstation',
        name: 'PlayStation 4',
        price: 9000,
        condition: 'Used',
        type: 'For Sale',
        description: 'A used console in good working condition.',
        details: 'This used PlayStation 4 is described as being in good working condition and is listed for ₱9,000. Contact the seller to ask about what is included, confirm its condition, and arrange a local handoff.',
        image: playstationImage
    },
    {
        id: 'sample-backpack',
        name: 'Everyday Backpack',
        price: 850,
        condition: 'Good',
        type: 'For Sale',
        description: 'A handy everyday backpack with plenty of room.',
        details: 'A practical everyday backpack with plenty of room for books, supplies, or a day out. It is in good condition and listed for ₱850. Contact the seller if you would like more details or to arrange a local handoff.',
        image: backpackImage
    },
    {
        id: 'sample-novel',
        name: 'Paperback Novel',
        price: 180,
        condition: 'Good',
        type: 'For Sale',
        description: 'A gently read paperback, ready for its next reader.',
        details: 'This gently read paperback is ready for another reader and is listed for ₱180. Ask the seller about the book’s title and condition, then arrange a convenient local handoff.',
        image: novelImage
    },
    {
        id: 'sample-bicycle',
        name: 'City Bicycle',
        price: 3200,
        condition: 'Used',
        type: 'For Sale',
        description: 'A simple bicycle for rides around town.',
        details: 'A used city bicycle for simple rides around town. It is listed for ₱3,200. Contact the seller to ask about its size and condition and arrange a time to see it before buying.',
        image: bicycleImage
    },
    {
        id: 'sample-water-bottle',
        name: 'Reusable Water Bottle',
        price: 0,
        condition: 'Good',
        type: 'For Trade',
        description: 'Reusable bottle; open to a fair trade.',
        details: 'This reusable water bottle is in good condition and is available for a product-for-product exchange. Can be traded (through another product). Contact the seller to discuss a fair swap and local handoff.',
        image: waterBottleImage
    },
    {
        id: 'sample-umbrella',
        name: 'Folding Umbrella',
        price: 0,
        condition: 'Good',
        type: 'For Trade',
        description: 'Compact umbrella to trade for something useful.',
        details: 'A compact folding umbrella in good condition, available in exchange for another useful product. Can be traded (through another product). Contact the seller to suggest a fair swap and arrange a local handoff.',
        image: umbrellaImage
    },
    {
        id: 'sample-desk-lamp',
        name: 'Desk Lamp',
        price: 0,
        condition: 'Used',
        type: 'For Trade',
        description: 'A small working desk lamp, available for trade.',
        details: 'This used desk lamp is available for a product-for-product exchange. Can be traded (through another product). Contact the seller to ask about its condition, discuss a fair swap, and arrange a local handoff.',
        image: deskLampImage
    },
    {
        id: 'sample-potted-plant',
        name: 'Potted Plant',
        price: 0,
        condition: 'Good',
        type: 'For Trade',
        description: 'A cheerful little plant looking for a new home.',
        details: 'This potted plant is looking for a new home and is available to exchange for another product. Can be traded (through another product). Contact the seller to discuss a fair swap and local handoff.',
        image: pottedPlantImage
    },
    {
        id: 'sample-canon-camera-rental',
        name: 'Canon Camera',
        price: 750,
        rentalRatePerDay: 750,
        condition: 'Good',
        type: 'For Rent',
        description: 'A Canon camera for events, trips, and special occasions.',
        details: 'Rent this Canon camera for a special event, trip, or creative project. Please handle the equipment with care and return it with all included accessories.',
        minRentalDays: 1,
        maxRentalDays: 7,
        securityDeposit: 2000,
        returnByTime: '18:00',
        availableUntil: '',
        image: canonCameraImage,
        icon: '📷'
    },
    {
        id: 'sample-vacuum-rental',
        name: 'Vacuum Cleaner',
        price: 300,
        rentalRatePerDay: 300,
        condition: 'Good',
        type: 'For Rent',
        description: 'A handy vacuum cleaner for a home refresh or deep clean.',
        details: 'Borrow a vacuum cleaner for household cleaning. Keep it dry, empty the dust container before returning, and include all attachments.',
        minRentalDays: 1,
        maxRentalDays: 5,
        securityDeposit: 1000,
        returnByTime: '18:00',
        availableUntil: '',
        image: vacuumCleanerImage,
        icon: '🧹'
    },
    {
        id: 'sample-drone-rental',
        name: 'Camera Drone',
        price: 1200,
        rentalRatePerDay: 1200,
        condition: 'Good',
        type: 'For Rent',
        description: 'A camera drone for capturing views and special occasions.',
        details: 'Rent a camera drone for an event or a day of photography. The renter should be familiar with safe operation and local flight rules. Return the drone, controller, and accessories together.',
        minRentalDays: 1,
        maxRentalDays: 3,
        securityDeposit: 5000,
        returnByTime: '17:00',
        availableUntil: '',
        image: droneImage,
        icon: '🚁'
    },
    {
        id: 'sample-sound-system-rental',
        name: 'Sound System',
        price: 1000,
        rentalRatePerDay: 1000,
        condition: 'Good',
        type: 'For Rent',
        description: 'A sound system for a gathering, celebration, or small event.',
        details: 'Hire a sound system for a small event or family gathering. Confirm which speakers, cables, and accessories are included before pickup. Please return all equipment by the agreed time.',
        minRentalDays: 1,
        maxRentalDays: 3,
        securityDeposit: 3000,
        returnByTime: '22:00',
        availableUntil: '',
        image: soundSystemImage,
        icon: '🔊'
    },
    {
        id: 'sample-ebike-motor-rental',
        name: 'E-bike Motor',
        price: 900,
        rentalRatePerDay: 900,
        condition: 'Good',
        type: 'For Rent',
        description: 'An e-bike for getting around town without buying one.',
        details: 'Rent an e-bike for local trips. Confirm the battery charge, range, included charger, and pickup arrangements with the owner. Use it responsibly and return it at the agreed time.',
        minRentalDays: 1,
        maxRentalDays: 5,
        securityDeposit: 4000,
        returnByTime: '18:00',
        availableUntil: '',
        image: ebikeImage,
        icon: '🚲'
    }
]

function normalizeProduct(product) {
    if (!product || typeof product.name !== 'string') {
        throw new Error('A saved listing is invalid.')
    }

    return {
        ...product,
        id: product.id ?? crypto.randomUUID(),
        price: Number(product.price),
        condition: product.condition ?? '',
        type: product.type ?? '',
        description: product.description ?? '',
        image: product.image ?? '',
        rentalRatePerDay: Number(product.rentalRatePerDay ?? product.price ?? 0),
        minRentalDays: Number(product.minRentalDays ?? 1),
        maxRentalDays: Number(product.maxRentalDays ?? 1),
        securityDeposit: Number(product.securityDeposit ?? 0),
        returnByTime: product.returnByTime ?? '',
        availableUntil: product.availableUntil ?? '',
        icon: product.icon ?? ''
    }
}

export function useMarketplaceProducts() {
    function loadProducts() {
        if (isLoaded) return products

        const savedProducts = localStorage.getItem(STORAGE_KEY)
        if (savedProducts) {
            const parsedProducts = JSON.parse(savedProducts)
            if (!Array.isArray(parsedProducts)) {
                throw new Error('Saved listings must be an array.')
            }

            const userProducts = parsedProducts.filter(product =>
                !sampleProducts.some(sample => sample.id === product?.id)
            )
            const normalizedProducts = userProducts.map(normalizeProduct)
            products.value = normalizedProducts
            if (
                normalizedProducts.length !== parsedProducts.length
                || normalizedProducts.some((product, index) => product.id !== userProducts[index].id)
            ) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedProducts))
            }
        }

        isLoaded = true
        return products
    }

    function saveProducts(nextProducts) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts))
        products.value = nextProducts
    }

    function addProduct(product) {
        loadProducts()
        const newProduct = normalizeProduct({
            ...product,
            id: product.id ?? crypto.randomUUID()
        })
        saveProducts([...products.value, newProduct])
        return newProduct
    }

    function updateProduct(id, changes) {
        loadProducts()
        const existingProduct = products.value.find(product => product.id === id)
        if (!existingProduct) {
            throw new Error('This listing could not be found. Refresh your profile and try again.')
        }

        const updatedProduct = normalizeProduct({ ...existingProduct, ...changes, id })
        saveProducts(products.value.map(product => product.id === id ? updatedProduct : product))
        return updatedProduct
    }

    function deleteProduct(id) {
        loadProducts()
        if (!products.value.some(product => product.id === id)) {
            throw new Error('This listing could not be found. Refresh your profile and try again.')
        }

        saveProducts(products.value.filter(product => product.id !== id))
    }

    return {
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct
    }
}
