import {ref} from 'vue'

export function useProducts() {
    const products = ref([])

    function addProduct(product) {
        products.value.push(product)
    }
    function removeProduct(index){
        products.value.splice(index, 1)
    }
    return { products, addProduct, removeProduct }
}