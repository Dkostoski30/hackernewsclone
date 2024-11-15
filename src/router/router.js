import Home from "@/views/Home.vue";
import Post from "@/views/Post.vue";
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/post/:id', name: 'Post', component: Post, props: true},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;