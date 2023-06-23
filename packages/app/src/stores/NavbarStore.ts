import { ref } from "vue";
import { defineStore } from "pinia";
import { PrimeIcons } from "primevue/api";
import type { MenuItem } from "primevue/menuitem";
import { useUserStore } from "@app/stores/UserStore";

export const useNavbarStore = defineStore("navbar", () => {
    const UserStore = useUserStore();
    const items = ref<MenuItem[]>([
        {
            label: "Home",
            icon: PrimeIcons.HOME,
            to: "/",
        },
        {
            label: "Movies",
            icon: PrimeIcons.VIDEO,
            to: "/movies",
        },
        {
            label: "Watchlist",
            icon: PrimeIcons.LIST,
            to: "/watchlist",
            visible: () => UserStore.isLoggedIn,
        },
        {
            label: "Diary",
            icon: PrimeIcons.CALENDAR,
            to: "/diary",
            visible: () => UserStore.isLoggedIn,
        },
        {
            label: "Profile",
            icon: PrimeIcons.USER,
            to: "/profile",
            visible: () => UserStore.isLoggedIn,
        },
        {
            label: "Log out",
            icon: PrimeIcons.ARROW_RIGHT,
            command: () => UserStore.logOut(),
            visible: () => UserStore.isLoggedIn,
        },
        {
            label: "Login",
            icon: PrimeIcons.SIGN_IN,
            to: "/login",
            visible: () => !UserStore.isLoggedIn,
        },
        {
            label: "Sign up",
            icon: PrimeIcons.USER_PLUS,
            to: "/register",
            visible: () => !UserStore.isLoggedIn,
        },
    ]);

    const selectedItem = ref();
    const filteredItems = ref<MenuItem[]>([]);
    const searchItems = (event: { query: string }) => {
        filteredItems.value = items.value.filter(item =>
            (item.label as string).toLowerCase().startsWith(event.query.toLowerCase())
        );
    };
    const selectItem = (event: { value: MenuItem }) => {
        alert(event.value.label);
    };

    return {
        items,
        selectedItem,
        filteredItems,
        searchItems,
        selectItem,
    };
});