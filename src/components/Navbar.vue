<script setup>
import tubigonLogo from '../assets/images/products/tubigon logo.jpg'
</script>

<template>
    <header class="top-bar">
        <RouterLink class="brand" to="/" aria-label="Tubigon's Marketplace home">
            <img class="brand-logo" :src="tubigonLogo" alt="">
            Tubigon's <span>Marketplace</span>
        </RouterLink>
        <div class="header-actions">
            <RouterLink class="menu-button" to="/about" aria-label="About Tubigon's Marketplace" title="About">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </RouterLink>
            <RouterLink class="menu-button" to="/login" aria-label="Sign in" title="Sign in">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
            </RouterLink>
        </div>
    </header>

    <nav class="bottom-bar" aria-label="Main navigation">
        <RouterLink class="nav-item" to="/" aria-label="Home">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg>
            <span>Home</span>
        </RouterLink>
        <RouterLink class="nav-item" to="/search" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>
            <span>Search</span>
        </RouterLink>
        <RouterLink class="nav-item" to="/messages" aria-label="Messages">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.3-.7L4 20l1.5-4.2a7.5 7.5 0 1 1 14.5-4.3Z" /><path d="M8 11h.01M12 11h.01M16 11h.01" /></svg>
            <span>Messages</span>
        </RouterLink>
        <RouterLink class="nav-item" to="/cart" aria-label="Cart">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
            <span>Cart</span>
        </RouterLink>
        <RouterLink class="nav-item" to="/profile" aria-label="Profile">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /></svg>
            <span>Profile</span>
        </RouterLink>
    </nav>
</template>

<style scoped>
.top-bar {
    position: fixed;
    z-index: 20;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    height: 68px;
    align-items: center;
    justify-content: space-between;
    padding: 0 max(22px, calc((100vw - 1120px) / 2));
    border-bottom: 1px solid rgba(49, 78, 50, 0.12);
    background: rgba(247, 248, 237, 0.95);
    box-shadow: 0 3px 18px rgba(34, 61, 38, 0.08);
    backdrop-filter: blur(16px);
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #244c37;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.7px;
    text-decoration: none;
}

.brand-logo {
    width: 39px;
    height: 39px;
    flex: 0 0 auto;
    border: 1px solid rgba(49, 78, 50, 0.14);
    border-radius: 50%;
    background: #fff;
    object-fit: cover;
    box-shadow: 0 2px 7px rgba(34, 61, 38, 0.12);
}

.brand span {
    color: #6b8157;
    font-weight: 400;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 9px;
}

.menu-button {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid rgba(62, 94, 59, 0.14);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    color: #244d39;
}

.menu-button svg {
    width: 21px;
    height: 21px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
}

.bottom-bar {
    position: fixed;
    z-index: 20;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    min-height: 72px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    align-items: center;
    padding: 7px max(16px, calc((100vw - 680px) / 2)) max(7px, env(safe-area-inset-bottom));
    border-top: 1px solid rgba(63, 84, 54, 0.13);
    background: rgba(248, 248, 236, 0.97);
    box-shadow: 0 -7px 24px rgba(35, 58, 37, 0.09);
    backdrop-filter: blur(18px);
}

.nav-item {
    display: flex;
    min-height: 48px;
    min-width: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
    padding: 3px 2px;
    color: #66745f;
    font-size: 9px;
    font-weight: 650;
    text-decoration: none;
    transition: color 150ms ease;
}

.nav-item svg {
    width: 21px;
    height: 21px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.65;
}

.nav-item:hover,
.nav-item.router-link-active {
    color: #416a49;
}

@media (max-width: 560px) {
    .top-bar {
        height: 60px;
        padding: 0 17px;
    }

    .brand {
        font-size: 19px;
    }

    .brand-logo {
        width: 35px;
        height: 35px;
    }

    .menu-button {
        width: 44px;
        height: 44px;
    }

    .bottom-bar {
        min-height: 66px;
        padding-right: 8px;
        padding-left: 8px;
    }

    .nav-item {
        font-size: 8px;
    }
}
</style>
