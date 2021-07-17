import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import PhotoUpload from '/src/components/PhotoUpload.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/photoupload',
        name: 'Photo Upload',
        component: PhotoUpload,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router