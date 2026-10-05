<script setup lang="ts">
</script>

<template>
  <nav class="navbar">
        <h2 class="navbarTitle">Tubigons <span>Marketplace</span></h2>

    <div class="links">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/post-item">Post Item</RouterLink>
            <RouterLink to="/profile">Profile</RouterLink>
            <RouterLink class="loginLink" to="/login">Login</RouterLink>
    </div>
    
  </nav>
</template>
<style scoped>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        padding: 14px clamp(18px, 5vw, 56px);
        background: linear-gradient(110deg, #52a27a, #5b9879);
        border-bottom: 1px solid #a5ddc2;
        box-shadow: 0 4px 16px rgba(35, 105, 72, 0.12);
    }

    .navbarTitle {
        margin: 0;
        color: #37845f;
        font-size: 22px;
        font-weight: 750;
        letter-spacing: -0.5px;
        white-space: nowrap;
    }

    .navbarTitle span {
        color: #37845f;
        font-weight: 500;
    }

    .links {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .links a {
        padding: 9px 13px;
        border-radius: 999px;
        color: #286346;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: background-color 160ms ease, color 160ms ease, transform 160ms ease;
    }

    .links a:hover,
    .links a.router-link-active {
        background-color: rgba(255, 255, 255, 0.72);
        color: #145b3b;
    }

    .links a:hover {
        transform: translateY(-1px);
    }

    .links .loginLink {
        background-color: #287650;
        color: #f3fff8;
    }

    .links .loginLink:hover,
    .links .loginLink.router-link-active {
        background-color: #1d6241;
        color: #ffffff;
    }

    @media (max-width: 600px) {
        .navbar {
            flex-direction: column;
            gap: 10px;
            padding: 14px 12px;
        }

        .links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 2px;
        }

        .links a {
            padding: 8px 10px;
            font-size: 13px;
        }
    }
</style>
