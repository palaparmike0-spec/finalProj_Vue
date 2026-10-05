<script setup>
import {ref} from 'vue'

const name= ref('')
const price = ref('')
const condition = ref('')
const type = ref('')
const description = ref('')

function postItem(){
    const newProduct = {
        name: name.value,
        price: Number(price.value),
        condition: condition.value,
        type: type.value,
        description: description.value
    }
    const savedProducts = localStorage.getItem('products')
    let products = []
    if (savedProducts) {
        products = JSON.parse(savedProducts)
    }
    products.push(newProduct)
    localStorage.setItem('products', JSON.stringify(products))

    name.value = ''
    price.value = ''
    condition.value = ''
    type.value = ''
    description.value = ''

    alert('Item posted successfully!')
}
</script>

<template>
    <h1>Post Item</h1>

    <form @submit.prevent="postItem">

        <label>Item Name</label>
        <input
            v-model="name"
            placeholder="Item's Descriptive Name"
        >

        <br><br>

        <label>Price</label>
        <input
            v-model="price"
            placeholder="Specify the currency type"
            type="number"
        >
        <br><br>

        <label>Condition</label>
        <input
            v-model="condition"
            placeholder="Specify the condition"
        >
        <br><br>

        <label>Type</label>
        <select v-model="type">
            <option value="" disabled>Select from option</option>
            <option value="For Sale">For Sale</option>
            <option value="For Trade">For Trade</option>
        </select>

        <br><br>
        <label>Description</label>
        <textarea
            v-model="description"
            placeholder="Describe your item here..."
        ></textarea>

        <button type="submit">Post Item</button>

    </form>
</template>