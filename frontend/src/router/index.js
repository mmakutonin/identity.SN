import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Chat from '../views/Chat.vue'
import AccountSetup from '../views/AccountSetup.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:      '/',
        name:      'Login',
        component: Login
    },
    {
        path:      '/fill-info',
        name:      'AccountSetup',
        component: AccountSetup
    },
    {
        path:      '/',
        name:      'Chat',
        component: Chat
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router