<script setup lang="ts">
import { onMounted } from "vue";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Avatar from "primevue/avatar";
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
        <div v-if="UserStore.isLoggedIn">
            <h1 v-if="UserStore.isLoggedIn" class="mt-0">
                <Avatar
                    :image="UserStore.currentUser?.profilePicture"
                    size="large"
                    shape="circle"
                    class="profilePicture"
                />
                Welcome back, {{  UserStore.currentUser.displayName }}!
            </h1>
        </div>
        <div v-else>
            <h1 class="mt-0">Welcome to FilmEye</h1>
            <Button v-if="!UserStore.isLoggedIn"
                    label="Create your account now - it's free!"
                    severity="success"
                    raised
                    outlined
                    :onClick="navigateToSignup"
            />
        </div>
        <Divider />
        <MovieCarousel title="Popular Movies" :value="MovieStore.trendingMovies" />
        <Divider />
        <MovieCarousel title="Coming Soon" :value="MovieStore.upcomingMovies" />
    </div>
</template>

<style scoped>
.profilePicture {
    position: relative;
    top: 10px;
}
</style>