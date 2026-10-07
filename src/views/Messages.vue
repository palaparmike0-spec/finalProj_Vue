<template>
    <main class="app-page">
        <p class="section-kicker">KEEP THE CONVERSATION LOCAL</p>
        <h1 class="page-heading">Messages</h1>
        <p class="page-subtitle">A friendly place to talk through a sale or trade with a neighbor.</p>
        <section class="empty-state surface-card message-card">
            <span class="message-icon" aria-hidden="true">✉</span>
            <h2>Your conversations will live here</h2>
            <p>Messaging is not connected yet. You can still browse listings and reach out to arrange a local exchange in person.</p>
            <RouterLink class="primary-button" to="/search">Browse listings</RouterLink>
        </section>
    </main>
</template>

<style scoped>
.message-card {
    margin-top: 23px;
    padding: 48px 24px;
}

.message-icon {
    display: block;
    margin-bottom: 12px;
    color: #638257;
    font-size: 31px;
}

.message-card p {
    max-width: 470px;
    margin: 9px auto 17px;
}
</style>
