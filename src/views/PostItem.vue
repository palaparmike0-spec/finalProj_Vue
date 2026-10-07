<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductArtwork from '../components/ProductArtwork.vue'
import { useMarketplaceProducts } from '../composables/useMarketplaceProducts.js'
import { readProductImage } from '../utils/readProductImage.js'

const router = useRouter()
const { addProduct } = useMarketplaceProducts()
const form = ref({
    name: '',
    price: '',
    condition: '',
    type: '',
    description: '',
    rentalRatePerDay: '',
    minRentalDays: '1',
    maxRentalDays: '7',
    securityDeposit: '0',
    returnByTime: '18:00',
    availableUntil: ''
})
const image = ref('')
const imageName = ref('')
const errorMessage = ref('')
const isReadingImage = ref(false)
const isSubmitting = ref(false)
const imagePreviewProduct = computed(() => ({
    name: form.value.name || 'Your item',
    type: form.value.type,
    image: image.value
}))

async function chooseImage(event) {
    const file = event.target.files?.[0]
    if (!file) return

    errorMessage.value = ''
    isReadingImage.value = true
    try {
        image.value = await readProductImage(file)
        imageName.value = file.name
    } catch (error) {
        errorMessage.value = error.message
        event.target.value = ''
    } finally {
        isReadingImage.value = false
    }
}

function removeImage() {
    image.value = ''
    imageName.value = ''
}

function postItem() {
    errorMessage.value = ''
    const rentRate = Number(form.value.rentalRatePerDay)
    const minRentalDays = Number(form.value.minRentalDays)
    const maxRentalDays = Number(form.value.maxRentalDays)
    const price = form.value.type === 'For Rent' ? rentRate : Number(form.value.price)
    if (
        !form.value.name.trim()
        || !form.value.condition.trim()
        || !form.value.type
        || !Number.isFinite(price)
        || price < 0
        || (
            form.value.type === 'For Rent'
            && (
                rentRate <= 0
                || !Number.isInteger(minRentalDays)
                || !Number.isInteger(maxRentalDays)
                || minRentalDays < 1
                || maxRentalDays < minRentalDays
                || !form.value.returnByTime
                || !Number.isFinite(Number(form.value.securityDeposit))
                || Number(form.value.securityDeposit) < 0
            )
        )
    ) {
        errorMessage.value = form.value.type === 'For Rent'
            ? 'Enter the item details, a daily rate, valid rental day limits, a return deadline, and a non-negative deposit.'
            : 'Enter an item name, a valid non-negative price, a condition, and a listing type.'
        return
    }
    isSubmitting.value = true

    try {
        addProduct({
            name: form.value.name.trim(),
            price,
            condition: form.value.condition.trim(),
            type: form.value.type,
            description: form.value.description.trim(),
            image: image.value,
            ...(form.value.type === 'For Rent' ? {
                rentalRatePerDay: rentRate,
                minRentalDays,
                maxRentalDays,
                securityDeposit: Number(form.value.securityDeposit),
                returnByTime: form.value.returnByTime,
                availableUntil: form.value.availableUntil
            } : {})
        })
        router.push('/profile')
    } catch {
        errorMessage.value = 'Your listing could not be saved. Browser storage may be full; remove a large image or try again.'
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <main class="app-page">
        <header class="page-intro">
            <p class="section-kicker">SHARE SOMETHING WITH TUBIGON</p>
            <h1 class="page-heading">Post an item</h1>
            <p class="page-subtitle">Give a good find a new home. Add a photo if you have one—your listing will still look lovely with our default item artwork.</p>
        </header>

        <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>

        <form class="post-layout" @submit.prevent="postItem">
            <section class="form-card surface-card">
                <h2>Listing details</h2>

                <label class="form-field">
                    Item name
                    <input v-model="form.name" maxlength="80" placeholder="e.g. Mountain bike" required>
                </label>

                <div class="form-row">
                    <label class="form-field">
                        Price (₱)
                        <input v-if="form.type !== 'For Rent'" v-model="form.price" min="0" step="0.01" placeholder="0.00" type="number" required>
                        <span v-else class="field-help">Set the rental rate below.</span>
                    </label>
                    <label class="form-field">
                        Condition
                        <input v-model="form.condition" maxlength="40" placeholder="New, good, used..." required>
                    </label>
                </div>

                <label class="form-field">
                    Listing type
                    <select v-model="form.type" required>
                        <option disabled value="">Choose sale, trade, or rent</option>
                        <option>For Sale</option>
                        <option>For Trade</option>
                        <option>For Rent</option>
                    </select>
                </label>

                <section v-if="form.type === 'For Rent'" class="rental-fields" aria-labelledby="rental-terms-heading">
                    <div class="rental-heading">
                        <p class="section-kicker">CLEAR TERMS MAKE GOOD RENTALS</p>
                        <h3 id="rental-terms-heading">Rental terms</h3>
                    </div>
                    <label class="form-field">
                        Rental price per day (₱)
                        <input v-model="form.rentalRatePerDay" min="1" step="0.01" placeholder="e.g. 500" type="number" required>
                    </label>
                    <div class="form-row">
                        <label class="form-field">
                            Minimum days
                            <input v-model="form.minRentalDays" min="1" step="1" type="number" required>
                        </label>
                        <label class="form-field">
                            Maximum days
                            <input v-model="form.maxRentalDays" min="1" step="1" type="number" required>
                        </label>
                    </div>
                    <div class="form-row">
                        <label class="form-field">
                            Return by
                            <input v-model="form.returnByTime" type="time" required>
                        </label>
                        <label class="form-field">
                            Security deposit (₱) <span class="optional-label">Use 0 if none</span>
                            <input v-model="form.securityDeposit" min="0" step="0.01" type="number" required>
                        </label>
                    </div>
                    <label class="form-field">
                        Available to rent until <span class="optional-label">Optional</span>
                        <input v-model="form.availableUntil" type="date">
                    </label>
                    <p class="rental-hint">Confirm pickup, return condition, and final terms with the owner before renting.</p>
                </section>

                <label class="form-field">
                    Description <span class="optional-label">Optional</span>
                    <textarea v-model="form.description" maxlength="400" placeholder="Add useful details about your item..."></textarea>
                    <span class="field-help">{{ form.description.length }}/400 characters</span>
                </label>

                <div class="form-actions">
                    <button class="primary-button" type="submit" :disabled="isSubmitting || isReadingImage">
                        {{ isSubmitting ? 'Publishing...' : 'Publish listing' }}
                    </button>
                    <RouterLink class="secondary-button" to="/profile">Cancel</RouterLink>
                </div>
            </section>

            <aside class="image-card surface-card">
                <div class="image-heading">
                    <p class="section-kicker">A PICTURE IS A PLUS</p>
                    <h2>Show off your find</h2>
                    <p>Choose one photo up to 1 MB. No photo? We’ll use a matching item illustration.</p>
                </div>
                <ProductArtwork :product="imagePreviewProduct" />
                <label class="upload-button">
                    <input accept="image/*" type="file" @change="chooseImage">
                    <span aria-hidden="true">↑</span> {{ isReadingImage ? 'Loading photo...' : image ? 'Choose another photo' : 'Upload a photo' }}
                </label>
                <p v-if="imageName" class="file-name">{{ imageName }}</p>
                <button v-if="image" class="remove-image" type="button" @click="removeImage">Remove photo and use default artwork</button>
            </aside>
        </form>
    </main>
</template>

<style scoped>
.page-intro {
    margin-bottom: 22px;
}

.post-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr);
    align-items: start;
    gap: 18px;
}

.form-card,
.image-card {
    padding: clamp(19px, 3vw, 28px);
}

.form-card h2,
.image-heading h2 {
    margin: 0 0 20px;
    color: #34513b;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 23px;
    font-weight: 500;
}

.form-card {
    display: grid;
    gap: 17px;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 13px;
}

.rental-fields {
    display: grid;
    grid-column: 1 / -1;
    gap: 14px;
    padding: 17px;
    border: 1px solid #dce4d1;
    border-radius: 15px;
    background: #f5f6e9;
}

.rental-heading .section-kicker {
    margin-bottom: 4px;
}

.rental-heading h3 {
    margin: 0;
    color: #456149;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 18px;
    font-weight: 500;
}

.rental-hint {
    margin: 0;
    color: #65715d;
    font-size: 11px;
    line-height: 1.5;
}

.optional-label,
.field-help {
    color: #8a9680;
    font-size: 11px;
    font-weight: 500;
}

.field-help {
    justify-self: end;
}

.form-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 3px;
}

.image-heading p:last-child {
    margin: -12px 0 18px;
    color: #71806a;
    font-size: 12px;
    line-height: 1.6;
}

.image-card :deep(.product-artwork) {
    max-width: 100%;
}

.upload-button {
    display: flex;
    min-height: 42px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 14px;
    border: 1px solid #d3dfc8;
    border-radius: 999px;
    background: #f3f5e7;
    color: #466648;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
}

.upload-button span {
    font-size: 17px;
}

.upload-button input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
}

.upload-button:focus-within {
    outline: 3px solid rgba(85, 128, 75, 0.42);
    outline-offset: 2px;
}

.file-name {
    margin: 9px 0 0;
    overflow: hidden;
    color: #71806a;
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.remove-image {
    margin-top: 10px;
    padding: 4px 0;
    border: 0;
    background: transparent;
    color: #945246;
    font: inherit;
    font-size: 11px;
    cursor: pointer;
}

@media (max-width: 720px) {
    .post-layout {
        grid-template-columns: 1fr;
    }

    .image-card {
        grid-row: 1;
    }

}

@media (max-width: 430px) {
    .form-row {
        grid-template-columns: 1fr;
    }
}
</style>
