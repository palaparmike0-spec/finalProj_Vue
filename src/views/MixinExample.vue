<script>
import messageMixin from '../mixins/messageMixin.js'

export default {
    mixins: [messageMixin]
}
</script>
<template>
    <h1>{{ message }}</h1>

    <button @click="showMessage">Show Message</button>
</template>