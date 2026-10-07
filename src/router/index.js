import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PostItem from '../views/PostItem.vue'

import ItemDetails from '../views/ItemDetails.vue'
import Profile from '../views/Profile.vue'
import About from '../views/About.vue'
import Search from '../views/Search.vue'
import Messages from '../views/Messages.vue'
import Cart from '../views/Cart.vue'

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
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/messages',
        component: Messages
    },
    {
        path: '/cart',
        component: Cart
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router