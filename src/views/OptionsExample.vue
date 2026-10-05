<script>
export default {
    data(){
        return {
            name: 'iPhone 11',
            price: 12000
        }
    },
    methods: {
        showProduct(){
            console.log(this.name)
            console.log(this.price)
        }
    }
}
</script>
<template>
    <h1>{{ name }}</h1>

    <p>Price: ₱{{ price }}</p>

    <button @click="showProduct">Show Product</button>
</template>