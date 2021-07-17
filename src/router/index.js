import { createRouter, createWebHistory } from 'vue-router'
import ViewSorted from '/src/components/ViewSorted.vue'
import PhotoUpload from '/src/components/PhotoUpload.vue'
import Login from '/src/components/Login.vue'

const routes = [
    {
        path: '/viewsorted',
        name: 'View Sorted',
        component: ViewSorted,
    },
    {
        path: '/',
        name: 'Photo Upload',
        component: PhotoUpload,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router