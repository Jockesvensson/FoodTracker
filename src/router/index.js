import Vue from 'vue'
import VueRouter from 'vue-router'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import Home from '../views/Home.vue'

import Welcome from '../components/Welcome.vue'

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter)
    // Vue.use(VueAxios, axios)


const routes = [{
        path: '/',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../components/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../components/Register.vue')
    },
    {
        path: '/food',
        name: 'showFood',
        component: () =>
            import ('../components/showFood.vue')
    },
    {
        path: '/food/:id',
        name: 'singleFood',
        component: () =>
            import ('../components/singleFood.vue')
    },
    {
        path: '/myFood',
        name: 'myFood',
        component: () =>
            import ('../components/myFood.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/mySettings',
        name: 'mySettings',
        component: () =>
            import ('../components/mySettings.vue'),
        meta: { requiresAuth: true }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = firebase.auth().currentUser;
    if (requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
})

export default router