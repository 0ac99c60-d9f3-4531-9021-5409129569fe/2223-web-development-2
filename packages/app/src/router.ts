import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@app/views/HomeView.vue";
import { useUserStore } from "@app/stores/UserStore";

const loginRequired = (to, from) => {
    const UserStore = useUserStore();
    if (!UserStore.isLoggedIn)
        return { path: "/" };
};
const signedOutRequired = (to, from) => {
    const UserStore = useUserStore();
    if (UserStore.isLoggedIn)
        return { path: "/" };
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/movies",
            name: "movies",
            component: () => import("./views/MoviesView.vue"),
        },
        {
            path: "/movies/:movieId",
            name: "movieDetail",
            component: () => import("./views/MovieDetailView.vue"),
        },
        {
            path: "/diary",
            name: "diary",
            component: () => import("./views/DiaryView.vue"),
            beforeEnter: loginRequired,
        },
        {
            path: "/watchlist",
            name: "watchlist",
            component: () => import("./views/WatchlistView.vue"),
            beforeEnter: loginRequired,
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("./views/ProfileView.vue"),
            beforeEnter: loginRequired,
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./views/LoginView.vue"),
            beforeEnter: signedOutRequired,
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./views/RegisterView.vue"),
            beforeEnter: signedOutRequired,
        },
    ],
});

export default router;