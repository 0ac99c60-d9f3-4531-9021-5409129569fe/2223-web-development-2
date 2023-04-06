<script setup lang="ts">
import { reactive, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import Menubar from "primevue/menubar";
import AutoComplete from "primevue/autocomplete";
import type { MenuItem } from "primevue/menuitem";

const userStore = reactive({
    isLoggedIn: () => false,
});
const items = ref<MenuItem[]>([
    {
        label: "Home",
        icon: PrimeIcons.HOME,
        to: "/",
    },
    {
        label: "Profile",
        icon: PrimeIcons.USER,
        to: "/profile",
        visible: () => userStore.isLoggedIn(),
    },
    {
        label: "Movies",
        icon: PrimeIcons.VIDEO,
        to: "/about",
    },
    {
        label: "Watchlist",
        icon: PrimeIcons.LIST,
        to: "/watchlist",
        visible: () => userStore.isLoggedIn(),
    },
    {
        label: "Diary",
        icon: PrimeIcons.CALENDAR,
        to: "/diary",
        visible: () => userStore.isLoggedIn(),
    },
    {
        label: "Login",
        icon: PrimeIcons.SIGN_IN,
        to: "/login",
        visible: () => !userStore.isLoggedIn(),
    },
    {
        label: "Sign up",
        icon: PrimeIcons.USER_PLUS,
        to: "/register",
        visible: () => !userStore.isLoggedIn(),
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
</script>

<template>
    <Menubar :model="items">
        <template #start>
            <img alt="logo" src="https://primefaces.org/cdn/primevue/images/logo.svg" height="40" class="mr-2">
        </template>
        <template #end>
            <AutoComplete
                v-model="selectedItem"
                :suggestions="filteredItems"
                @complete="searchItems"
                @item-select="selectItem"
                :virtualScrollerOptions="{}"
                optionLabel="label"
                placeholder="Search..." />
        </template>
    </Menubar>
</template>

<style scoped>

</style>