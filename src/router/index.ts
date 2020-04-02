import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Labels from '@/views/labels.vue'
import Money from  '@/views/money.vue'
import Statistics from '@/views/statistics.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/money'
    },
    {
        path: '/labels',
        component: Labels
    },
    {
        path: '/money',
        component: Money
    },
    {
        path: '/statistics',
        component: Statistics
    },
    // {
    // path: '/about',
    // name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    routes
})

export default router
