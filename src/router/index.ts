import { createRouter, createWebHistory } from "vue-router"
import ConfigView from "../views/ConfigView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "config",
            component: ConfigView
        },
        {
            path: "/widget",
            name: "widget",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/WidgetView.vue")
        }
    ]
})

export default router
