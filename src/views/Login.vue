<script setup>
import {ref} from 'vue'

const username = ref('')
const password = ref('')

function login(){
    console.log('Username:', username.value)
    console.log('Password:', password.value)
}
</script>

<template>
    <h1>Login</h1>
    <form @submit.prevent="login">
        <input
            v-model="username"
            placeholder="Username"
        >
        <input
            v-model="password"
            placeholder="Password"
            type="password"
        >
        <button type="submit">Login</button>
    </form>
</template>