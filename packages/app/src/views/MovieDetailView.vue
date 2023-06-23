<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import Divider from "primevue/divider";
import router from "@app/router";
import { useMovieDetailStore } from "@app/stores/MovieDetailStore";
import { useUserStore } from "@app/stores/UserStore";
import TMDBImage from "@app/components/TMDBImage.vue";
import ReviewList from "@app/components/ReviewList.vue";
import ReviewComposer from "../components/ReviewComposer.vue";

const movieId = useRoute().params.movieId as string;
const MovieDetailStore = useMovieDetailStore();
const UserStore = useUserStore();
const { movie } = storeToRefs(MovieDetailStore);
const { fetchMovie, $reset } = MovieDetailStore;
const isReviewComposerOpen = ref(false);

function handleReviewButton() {
    isReviewComposerOpen.value = true;
}

function handleLoginButton() {
    router.push("/login");
}

onMounted(() => {
    fetchMovie(movieId);
});
onUnmounted(() => {
    $reset();
});
</script>

<template>
    <div>
        <div v-if="movie" class="md:flex gap-4">
            <TMDBImage class="align-self-start" :path="movie?.poster_path" type="poster" size="w342" />

            <div class="flex flex-column">
                <h2 class="mb-1">{{ movie.title }} ({{ movie.release_date.slice(0, 4) }})</h2>

                <small class="text-color-secondary">
                    {{ new Date(movie.release_date).toLocaleDateString() }}
                    &bullet;
                    {{ movie.runtime }} minutes
                    &bullet;
                    {{ movie.genres.map((genre) => genre.name).join(", ") }}
                </small>

                <p class="my-2">{{ movie.overview }}</p>

                <div class="flex gap-1">
                    <Button icon="pi pi-check" rounded v-tooltip.top="'Remove from watchlist'" />
                    <Button icon="pi pi-plus" rounded outlined v-tooltip.top="'Add to watchlist'" />
                    <Button icon="pi pi-pencil" rounded outlined v-tooltip.top="'Write review'" />
                </div>
            </div>
        </div>

        <Divider />

        <div>
            <h2>Reviews</h2>

            <ReviewComposer v-if="isReviewComposerOpen" :movie="movie" @close="isReviewComposerOpen = false" />

            <Button v-if="UserStore.isLoggedIn"
                    icon="pi pi-pencil"
                    label="Write review"
                    outlined
                    class="mb-3"
                    @click="handleReviewButton"
            />
            <Button v-else
                label="Login to write a review"
                outlined
                class="mb-3"
                @click="handleLoginButton"
            />

            <ReviewList :movieId="movieId" />
        </div>
    </div>
</template>

<style scoped>
</style>