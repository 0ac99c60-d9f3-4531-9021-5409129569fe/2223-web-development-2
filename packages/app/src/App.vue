<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import Navbar from "@app/components/Navbar.vue";
import { useUserStore } from "@app/stores/UserStore";
import Divider from "primevue/divider";

const UserStore = useUserStore();
onMounted(() => {
    // fetch the user on app load and set it in cache
    UserStore.fetchUser();
});
</script>

<template>
    <div class="grid">
        <header class="mb-2">
            <Navbar />
        </header>
        <main class="md:col-8 md:col-offset-2">
            <RouterView />
        </main>
        <footer class="col-8 md:col-offset-2 text-400">
            <Divider />
            <small>This product uses the TMDB API but is not endorsed or certified by TMDB.</small>
        </footer>
    </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
    main {
        margin: 1rem !important;
    }
}
</style>
