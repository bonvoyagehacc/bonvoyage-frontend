import { createRouter, createWebHistory } from 'vue-router'
import ViewSorted from '/src/components/ViewSorted.vue'
import PhotoUpload from '/src/components/PhotoUpload.vue'

const routes = [
    {
        path: '/viewsorted',
        name: 'View Sorted',
        component: ViewSorted,
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