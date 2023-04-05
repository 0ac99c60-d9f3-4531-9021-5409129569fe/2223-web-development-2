<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
    <div class="grid">
        <header class="col-8 md:col-offset-2">
            <NavBar />
        </header>
        <main class="col-8 md:col-offset-2">
            <RouterView />
        </main>
        <footer class="col-8 md:col-offset-2 text-400">
            <small>This product uses the TMDB API but is not endorsed or certified by TMDB.</small>
        </footer>
    </div>
</template>

<style scoped>

</style>
