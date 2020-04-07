import Vue from 'vue'
import VueRouter from 'vue-router'
import Labels from '@/views/labels.vue'
import Money from  '@/views/money.vue'
import Statistics from '@/views/statistics.vue'
import NotFound from '@/views/NotFound.vue'
import EditLabel from '@/views/EditLabel.vue';

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
    {
        path: '/labels/edit',
        component: EditLabel
    },
    {
        path: '/*',
        component: NotFound
    },
    // {
    // path: '/about',
    // name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
];

const router = new VueRouter({
    routes
});

export default router
