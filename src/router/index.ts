import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Streaming from "../components/Streaming.vue";

const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/streaming",
        name: "Streaming",
        component: Streaming,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;