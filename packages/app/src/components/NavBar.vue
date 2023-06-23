<script setup lang="ts">
import Menubar from "primevue/menubar";
import AutoComplete from "primevue/autocomplete";
import { useNavbarStore } from "@app/stores/NavbarStore";
import { storeToRefs } from "pinia";

const NavbarStore = useNavbarStore();
const {
    items,
    selectedItem,
    filteredItems,
} = storeToRefs(NavbarStore);
const { searchItems, selectItem } = NavbarStore;
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
.p-menubar {
    border: 0;
}
</style>