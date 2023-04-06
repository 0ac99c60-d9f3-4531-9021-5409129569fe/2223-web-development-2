<script setup lang="ts">
import { onMounted } from "vue";
import Button from "primevue/button";
import TheWelcome from "@app/components/TheWelcome.vue";
import MovieCarousel from "@app/components/MovieCarousel.vue";
import { useMovieStore } from "@app/stores/MovieStore";
import { useUserStore } from "@app/stores/UserStore";
import router from "@app/router";

const MovieStore = useMovieStore();
const UserStore = useUserStore();

function navigateToSignup() {
    router.push("/register");
}

onMounted(() => {
    MovieStore.fetchTrending();
    MovieStore.fetchUpcoming();
});
</script>

<template>
    <div>
        <TheWelcome />

        <Button v-if="!UserStore.isLoggedIn"
                label="Create your account now - it's free!"
                severity="success"
                raised
                outlined
                :onClick="navigateToSignup"
        />

        <MovieCarousel title="Popular Movies" :value="MovieStore.trendingMovies" />
        <MovieCarousel title="Coming Soon" :value="MovieStore.upcomingMovies" />
    </div>
</template>

<style scoped>
</style>