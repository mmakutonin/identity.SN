import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Chat from '../views/Chat.vue'
import AccountSetup from '../views/AccountSetup.vue'
import Auth from '../views/Auth'
import Settings from '../views/Settings'

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
        path:      '/chat',
        name:      'Chat',
        component: Chat
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router