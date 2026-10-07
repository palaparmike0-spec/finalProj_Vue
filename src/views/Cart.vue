<template>
    <main class="app-page">
        <p class="section-kicker">KEEP YOUR FINDS TOGETHER</p>
        <h1 class="page-heading">Your cart</h1>
        <p class="page-subtitle">Items you’re interested in will be easy to find here.</p>
        <section class="empty-state surface-card cart-card">
            <span class="cart-icon" aria-hidden="true">🧺</span>
            <h2>Your cart is taking a little breather</h2>
            <p>Checkout is not available yet. Explore the marketplace and find a local item you love.</p>
            <RouterLink class="primary-button" to="/search">Browse local finds</RouterLink>
        </section>
    </main>
</template>

<style scoped>
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
</style>
