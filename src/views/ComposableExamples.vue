<script setup>
import { useProducts } from '../composables/useProducts.js'

const {
  products,
  addProduct,
  removeProduct
} = useProducts()

function addSampleProduct() {
  addProduct({
    name: 'iPhone 11',
    price: 12000
  })
}
</script>

<template>
  <h1>Composable Example</h1>

  <button @click="addSampleProduct">
    Add Product
  </button>

  <div
    v-for="(product, index) in products"
    :key="index"
  >
    <p>
      {{ product.name }} - ₱{{ product.price }}
    </p>

    <button @click="removeProduct(index)">
      Delete
    </button>
  </div>
</template>