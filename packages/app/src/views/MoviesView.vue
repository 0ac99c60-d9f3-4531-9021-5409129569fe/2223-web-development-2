<script setup lang="ts">
import { onMounted } from "vue";
import { useMovieStore } from "@app/stores/MovieStore";
import MovieCarousel from "@app/components/MovieCarousel.vue";
import Divider from "primevue/divider";

const MovieStore = useMovieStore();

onMounted(() => {
    MovieStore.fetchTrending();
    MovieStore.fetchUpcoming();
});
</script>

<template>
    <div>
        <h1 class="m-0">Movies</h1>
        <MovieCarousel title="Popular Movies" :value="MovieStore.trendingMovies" />
        <Divider />
        <MovieCarousel title="Coming Soon" :value="MovieStore.upcomingMovies" />
    </div>
</template>

<style scoped>

</style>