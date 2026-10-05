import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PostItem from '../views/PostItem.vue'

import ItemDetails from '../views/ItemDetails.vue'
import Profile from '../views/Profile.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/post-item',
        component: PostItem
    },
    {
        path: '/item',
        component: ItemDetails
    },
    {
        path: '/profile',
        component: Profile
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router