<script setup>
const props = defineProps({
    name: String,
    price: Number,
    condition: String,
    type: String
})

const emit = defineEmits(['view-item'])

function viewItem() {
    emit('view-item', props.name)
}
</script>
<template>
    <div>
        <h3>{{  props.name }}</h3>
        <p>₱{{  props.price }}</p>
        <p>Condition: {{  props.condition }}</p>
        <p>Type: {{  props.type }}</p>

        <button @click="viewItem">View Item</button>
    </div>
</template>