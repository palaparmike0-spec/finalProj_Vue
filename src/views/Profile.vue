<script setup>
import { computed, onMounted, ref } from 'vue'
import ProductArtwork from '../components/ProductArtwork.vue'
import { useMarketplaceProducts } from '../composables/useMarketplaceProducts.js'
import { readProductImage } from '../utils/readProductImage.js'

const { products, loadProducts, updateProduct, deleteProduct } = useMarketplaceProducts()
const errorMessage = ref('')
const notice = ref('')
const editingId = ref('')
const imageError = ref('')
const form = ref(createEmptyForm())
const postedProducts = computed(() => products.value)

function createEmptyForm() {
    return {
        name: '',
        price: '',
        condition: '',
        type: '',
        description: '',
        image: '',
        rentalRatePerDay: '',
        minRentalDays: '1',
        maxRentalDays: '7',
        securityDeposit: '0',
        returnByTime: '18:00',
        availableUntil: ''
    }
}

function startEditing(product) {
    editingId.value = product.id
    form.value = {
        name: product.name,
        price: String(product.price),
        condition: product.condition,
        type: product.type,
        description: product.description ?? '',
        image: product.image ?? '',
        rentalRatePerDay: String(product.rentalRatePerDay ?? product.price ?? ''),
        minRentalDays: String(product.minRentalDays ?? 1),
        maxRentalDays: String(product.maxRentalDays ?? 1),
        securityDeposit: String(product.securityDeposit ?? 0),
        returnByTime: product.returnByTime ?? '18:00',
        availableUntil: product.availableUntil ?? ''
    }
    errorMessage.value = ''
    imageError.value = ''
    notice.value = ''
}

function cancelEditing() {
    editingId.value = ''
    form.value = createEmptyForm()
    imageError.value = ''
}

function productPreview(product) {
    return editingId.value === product.id
        ? { ...product, image: form.value.image }
        : product
}

async function chooseImage(event) {
    const file = event.target.files?.[0]
    if (!file) return
    imageError.value = ''

    try {
        form.value.image = await readProductImage(file)
    } catch (error) {
        imageError.value = error.message
        event.target.value = ''
    }
}

function saveEdit() {
    errorMessage.value = ''
    const name = form.value.name.trim()
    const condition = form.value.condition.trim()
    const isRental = form.value.type === 'For Rent'
    const price = Number(isRental ? form.value.rentalRatePerDay : form.value.price)
    const minRentalDays = Number(form.value.minRentalDays)
    const maxRentalDays = Number(form.value.maxRentalDays)
    if (
        !name
        || !condition
        || !form.value.type
        || !Number.isFinite(price)
        || price < (isRental ? 1 : 0)
        || (isRental && (
            !Number.isInteger(minRentalDays)
            || !Number.isInteger(maxRentalDays)
            || minRentalDays < 1
            || maxRentalDays < minRentalDays
            || !form.value.returnByTime
            || !Number.isFinite(Number(form.value.securityDeposit))
            || Number(form.value.securityDeposit) < 0
        ))
    ) {
        errorMessage.value = isRental
            ? 'Enter the item details, a daily rate, valid rental day limits, a return deadline, and a non-negative deposit.'
            : 'Enter an item name, a valid non-negative price, a condition, and a listing type.'
        return
    }

    try {
        updateProduct(editingId.value, {
            name,
            price,
            condition,
            type: form.value.type,
            description: form.value.description.trim(),
            image: form.value.image,
            ...(isRental ? {
                rentalRatePerDay: price,
                minRentalDays,
                maxRentalDays,
                securityDeposit: Number(form.value.securityDeposit),
                returnByTime: form.value.returnByTime,
                availableUntil: form.value.availableUntil
            } : {})
        })
        notice.value = 'Your listing has been updated.'
        cancelEditing()
    } catch {
        errorMessage.value = 'Your listing could not be updated. Browser storage may be full; try removing the image.'
    }
}

function removeProduct(product) {
    if (!window.confirm(`Delete "${product.name}" from your posted items?`)) return
    errorMessage.value = ''

    try {
        deleteProduct(product.id)
        if (editingId.value === product.id) cancelEditing()
        notice.value = `"${product.name}" was removed from your posted items.`
    } catch {
        errorMessage.value = 'This listing could not be deleted. Refresh the page and try again.'
    }
}

onMounted(() => {
    try {
        loadProducts()
    } catch {
        errorMessage.value = 'Your posted listings could not be loaded. Your data has not been changed.'
    }
})
</script>

<template>
    <main class="app-page">
        <header class="profile-header">
            <div class="profile-avatar" aria-hidden="true">T</div>
            <div class="profile-heading">
                <p class="section-kicker">YOUR LITTLE CORNER OF THE MARKET</p>
                <h1 class="page-heading">My profile</h1>
                <p class="page-subtitle">Manage the things you’ve shared with the Tubigon community.</p>
            </div>
            <RouterLink class="primary-button post-link" to="/post-item">＋ Post an item</RouterLink>
        </header>

        <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>
        <p v-else-if="notice" class="status-message" role="status">{{ notice }}</p>

        <section class="posted-section" aria-labelledby="posted-heading">
            <div class="section-heading">
                <div>
                    <p class="section-kicker">YOUR MARKETPLACE POSTS</p>
                    <h2 id="posted-heading">Posted items <span class="item-count">{{ postedProducts.length }}</span></h2>
                </div>
                <RouterLink class="secondary-button" to="/post-item">Add a listing</RouterLink>
            </div>

            <div v-if="postedProducts.length" class="posted-list">
                <article v-for="product in postedProducts" :key="product.id" class="posted-card surface-card">
                    <ProductArtwork :product="productPreview(product)" />

                    <form v-if="editingId === product.id" class="edit-form" @submit.prevent="saveEdit">
                        <p class="section-kicker">UPDATE THIS LISTING</p>
                        <label class="form-field">
                            Item name
                            <input v-model="form.name" maxlength="80" required>
                        </label>
                        <div class="edit-row">
                            <label class="form-field">
                                Price (₱)
                                <input v-if="form.type !== 'For Rent'" v-model="form.price" min="0" step="0.01" type="number" required>
                                <span v-else class="field-help">Set the rental rate below.</span>
                            </label>
                            <label class="form-field">
                                Condition
                                <input v-model="form.condition" maxlength="40" required>
                            </label>
                        </div>
                        <label class="form-field">
                            Listing type
                            <select v-model="form.type" required>
                                <option>For Sale</option>
                                <option>For Trade</option>
                                <option>For Rent</option>
                            </select>
                        </label>
                        <section v-if="form.type === 'For Rent'" class="edit-rental-fields" aria-label="Rental terms">
                            <label class="form-field">
                                Rental price per day (₱)
                                <input v-model="form.rentalRatePerDay" min="1" step="0.01" type="number" required>
                            </label>
                            <div class="edit-row">
                                <label class="form-field">
                                    Minimum days
                                    <input v-model="form.minRentalDays" min="1" step="1" type="number" required>
                                </label>
                                <label class="form-field">
                                    Maximum days
                                    <input v-model="form.maxRentalDays" min="1" step="1" type="number" required>
                                </label>
                            </div>
                            <div class="edit-row">
                                <label class="form-field">
                                    Return by
                                    <input v-model="form.returnByTime" type="time" required>
                                </label>
                                <label class="form-field">
                                    Security deposit (₱)
                                    <input v-model="form.securityDeposit" min="0" step="0.01" type="number" required>
                                </label>
                            </div>
                            <label class="form-field">
                                Available to rent until (optional)
                                <input v-model="form.availableUntil" type="date">
                            </label>
                        </section>
                        <label class="form-field">
                            Description
                            <textarea v-model="form.description" maxlength="400" rows="3"></textarea>
                        </label>
                        <label class="upload-button">
                            <input accept="image/*" type="file" @change="chooseImage">
                            {{ form.image ? 'Change listing photo' : 'Add a listing photo' }}
                        </label>
                        <button v-if="form.image" class="remove-photo" type="button" @click="form.image = ''">Remove photo and use default artwork</button>
                        <p v-if="imageError" class="error-message inline-error" role="alert">{{ imageError }}</p>
                        <div class="edit-actions">
                            <button class="primary-button" type="submit">Save changes</button>
                            <button class="secondary-button" type="button" @click="cancelEditing">Cancel</button>
                        </div>
                    </form>

                    <div v-else class="posted-info">
                        <div class="posted-title-row">
                            <div>
                                <p class="product-type">{{ product.type }} <span>·</span> {{ product.condition }}</p>
                                <h3>{{ product.name }}</h3>
                            </div>
                            <strong class="posted-price">
                                {{ product.type === 'For Trade' ? 'Trade' : product.type === 'For Rent' ? `₱${Number(product.rentalRatePerDay ?? product.price).toLocaleString('en-PH')} / day` : `₱${Number(product.price).toLocaleString('en-PH')}` }}
                            </strong>
                        </div>
                        <p class="product-description">{{ product.description || 'No description added.' }}</p>
                        <p v-if="product.type === 'For Rent'" class="posted-rental-terms">
                            {{ product.minRentalDays }}–{{ product.maxRentalDays }} days · return by {{ product.returnByTime || 'agreed time' }}
                            <span v-if="product.securityDeposit">· {{ `₱${Number(product.securityDeposit).toLocaleString('en-PH')} deposit` }}</span>
                        </p>
                        <div class="posted-actions">
                            <button class="secondary-button" type="button" @click="startEditing(product)">Edit listing</button>
                            <button class="danger-button" type="button" @click="removeProduct(product)">Delete</button>
                        </div>
                    </div>
                </article>
            </div>

            <div v-else class="empty-state surface-card">
                <span class="empty-icon" aria-hidden="true">🌱</span>
                <h2>Your posted items will grow here</h2>
                <p>You haven’t shared a listing yet. Add a photo if you have one, or let the marketplace choose an item illustration.</p>
                <RouterLink class="primary-button" to="/post-item">Post your first item</RouterLink>
            </div>
        </section>
    </main>
</template>

<style scoped>
.profile-header {
    display: flex;
    align-items: center;
    gap: 17px;
    padding: 24px;
    border: 1px solid rgba(224, 228, 206, 0.93);
    border-radius: 20px;
    background: rgba(250, 250, 239, 0.95);
    box-shadow: 0 10px 28px rgba(39, 62, 40, 0.1);
}

.profile-avatar {
    display: grid;
    width: 64px;
    height: 64px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid #d5dfc4;
    border-radius: 50%;
    background: linear-gradient(145deg, #e9edd5, #cbdab9);
    color: #52704b;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 27px;
}

.profile-heading {
    flex: 1;
}

.profile-heading .page-subtitle {
    margin-top: 6px;
}

.profile-heading .section-kicker {
    margin-bottom: 5px;
}

.posted-section {
    margin-top: 29px;
}

.section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 14px;
    margin-bottom: 15px;
}

.section-heading .section-kicker {
    margin-bottom: 5px;
}

.section-heading h2 {
    display: flex;
    align-items: center;
    gap: 9px;
    margin: 0;
    color: #35513a;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 24px;
    font-weight: 500;
}

.item-count {
    display: grid;
    min-width: 24px;
    height: 24px;
    place-items: center;
    border-radius: 50%;
    background: #e6edd7;
    color: #617b50;
    font: 700 11px "DM Sans", sans-serif;
}

.posted-list {
    display: grid;
    gap: 14px;
}

.posted-card {
    display: grid;
    grid-template-columns: minmax(155px, 230px) minmax(0, 1fr);
    align-items: start;
    gap: 20px;
    padding: 15px;
}

.posted-card :deep(.product-artwork),
.posted-card :deep(.product-artwork img) {
    align-self: start;
}

.posted-info {
    padding: 5px 4px 3px 0;
}

.posted-title-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

.product-type {
    margin: 0 0 5px;
    color: #82906f;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.45px;
    text-transform: uppercase;
}

.product-type span {
    padding: 0 3px;
    color: #b3b99b;
}

.posted-title-row h3 {
    margin: 0;
    color: #354b37;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 21px;
}

.posted-price {
    flex: 0 0 auto;
    padding-top: 17px;
    color: #426847;
    font-size: 14px;
}

.product-description {
    margin: 11px 0 17px;
    color: #77806f;
    font-size: 12px;
    line-height: 1.6;
}

.posted-actions,
.edit-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.edit-form {
    display: grid;
    gap: 12px;
}

.edit-rental-fields {
    display: grid;
    gap: 12px;
    padding: 14px;
    border: 1px solid #dce4d1;
    border-radius: 13px;
    background: #f5f6e9;
}

.posted-rental-terms {
    margin: -8px 0 15px;
    color: #6a7658;
    font-size: 11px;
    line-height: 1.5;
}

.field-help {
    color: #71806a;
    font-size: 11px;
    font-weight: 500;
}

.edit-form .section-kicker {
    margin: 0;
}

.edit-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 11px;
}

.edit-form .form-field textarea {
    min-height: 75px;
}

.upload-button {
    display: inline-flex;
    width: fit-content;
    min-height: 37px;
    align-items: center;
    padding: 0 13px;
    border: 1px solid #d3dfc8;
    border-radius: 999px;
    background: #f3f5e7;
    color: #466648;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
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

.remove-photo {
    width: fit-content;
    padding: 0;
    border: 0;
    background: transparent;
    color: #945246;
    font: inherit;
    font-size: 11px;
    cursor: pointer;
}

.inline-error {
    margin: 0;
}

.empty-state {
    padding: 43px 24px;
}

.empty-icon {
    display: block;
    margin-bottom: 10px;
    font-size: 30px;
}

.empty-state p {
    max-width: 430px;
    margin-right: auto;
    margin-left: auto;
}

@media (max-width: 650px) {
    .profile-header {
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 19px;
    }

    .profile-avatar {
        width: 51px;
        height: 51px;
        font-size: 22px;
    }

    .post-link {
        width: 100%;
        margin-top: 2px;
    }

    .posted-card {
        grid-template-columns: 1fr;
        gap: 13px;
    }

    .posted-info {
        padding: 0 2px 3px;
    }
}

@media (max-width: 420px) {
    .section-heading {
        align-items: flex-start;
        flex-direction: column;
    }

    .edit-row {
        grid-template-columns: 1fr;
    }
}
</style>
