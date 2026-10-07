<script setup>
import tubigonHighlighted from '../backgroundAssets/tubigon_highlighted.png'
</script>

<template>
    <main class="app-page">
        <section class="about-card surface-card">
            <p class="section-kicker">ROOTED HERE IN TUBIGON</p>
            <h1 class="page-heading">A marketplace with a local heart.</h1>
            <p class="page-subtitle">Tubigon's Marketplace brings neighbors together to discover, sell, and trade pre-loved finds close to home.</p>
            <div class="about-art">
                <img :src="tubigonHighlighted" alt="A highlighted view of Tubigon">
            </div>
            <div class="about-columns">
                <section>
                    <h2>Find something good</h2>
                    <p>Explore local listings and give useful things another chapter. Browse sale items and trade finds from the community.</p>
                </section>
                <section>
                    <h2>Share with your neighbors</h2>
                    <p>Post an item with a description and an optional photo. Your posted listings can be updated or removed from your profile.</p>
                </section>
            </div>
            <div class="about-actions">
                <RouterLink class="primary-button" to="/post-item">Post an item</RouterLink>
                <RouterLink class="secondary-button" to="/">Explore the marketplace</RouterLink>
            </div>
        </section>
    </main>
</template>

<style scoped>
.about-card {
    overflow: hidden;
    padding: clamp(23px, 5vw, 42px);
}

.about-card > .page-subtitle {
    max-width: 590px;
}

.about-art {
    min-height: 160px;
    margin: 23px 0;
    overflow: hidden;
    border: 1px solid #d9e0c7;
    border-radius: 17px;
}

.about-art img {
    display: block;
    width: 100%;
    height: 220px;
    object-fit: cover;
    object-position: center 48%;
}

.about-columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
}

.about-columns h2 {
    margin: 0 0 7px;
    color: #456149;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 19px;
    font-weight: 500;
}

.about-columns p {
    margin: 0;
    color: #71806a;
    font-size: 12px;
    line-height: 1.7;
}

.about-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 23px;
}

@media (max-width: 560px) {
    .about-columns {
        grid-template-columns: 1fr;
    }
}
</style>
