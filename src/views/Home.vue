<script setup>
import { ref, computed,onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'

const search = ref('')
const products = ref([
    {
        name: 'Iphone 11',
        price: 12000,
        condition: 'Good',
        type: 'For Sale'
    },
    {
        name: 'Nike Shoes',
        price: 1500,
        condition: 'New',
        type: 'For Trade'
    },
    {
        name: 'PlayStation 4',
        price: 9000,
        condition: 'Used',
        type: 'For Sale'
    }
])

const filteredProducts = computed(() => {
    return products.value.filter(product =>
        product.name.toLowerCase().includes(search.value.toLowerCase())
        )
})
const selectedProduct = ref('')

function handleViewItem(productName) {
    selectedProduct.value = productName
}

onMounted(() => {
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
        products.value = JSON.parse(savedProducts)
    }
})

</script>

<template>
    <h1 id="titleMainPage">Welcome to Tubigon's Marketplace</h1>

    <input v-model="search" placeholder="Search products...">

    <p v-if="selectedProduct">Selected item: {{ selectedProduct }}</p>

    <ProductCard
    v-for="product in filteredProducts"
    :key="product.name"
    :name="product.name"
    :price="product.price"
    :condition="product.condition"
    :type="product.type"
    @view-item="handleViewItem"
    
    />
    

</template>
<style>
    #titleMainPage {
        text-align: left;
        color: rgb(0, 0, 0);
    }
    body {
    min-height: 100vh;
    overflow-y: auto;
    background: url("../assets/images/bg.jpg");
    }
</style>