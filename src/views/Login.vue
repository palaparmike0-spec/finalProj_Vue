<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const message = ref('')

function login() {
    message.value = 'Account sign-in is not connected yet. You can browse the marketplace and manage listings saved on this device.'
    password.value = ''
}
</script>

<template>
    <main class="app-page login-page">
        <section class="login-card surface-card">
            <p class="section-kicker">WELCOME BACK TO THE MARKET</p>
            <h1 class="page-heading">A familiar place to find a good thing.</h1>
            <p class="page-subtitle">Sign-in is being prepared. You can continue exploring the community marketplace in the meantime.</p>

            <form class="login-form" @submit.prevent="login">
                <label class="form-field">
                    Username
                    <input v-model="username" autocomplete="username" placeholder="Your username" required>
                </label>
                <label class="form-field">
                    Password
                    <input v-model="password" autocomplete="current-password" placeholder="Your password" type="password" required>
                </label>
                <p v-if="message" class="status-message" role="status">{{ message }}</p>
                <button class="primary-button" type="submit">Continue</button>
            </form>

            <RouterLink class="browse-link" to="/">Take me back to the marketplace <span aria-hidden="true">→</span></RouterLink>
        </section>
    </main>
</template>

<style scoped>
.login-page {
    display: grid;
    place-items: start center;
}

.login-card {
    width: min(100%, 520px);
    padding: clamp(24px, 5vw, 42px);
}

.login-card .page-subtitle {
    margin-bottom: 23px;
}

.login-form {
    display: grid;
    gap: 15px;
}

.login-form .status-message {
    margin: 0;
}

.browse-link {
    display: inline-block;
    margin-top: 23px;
    color: #55754d;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
}

.browse-link span {
    margin-left: 4px;
}
</style>
