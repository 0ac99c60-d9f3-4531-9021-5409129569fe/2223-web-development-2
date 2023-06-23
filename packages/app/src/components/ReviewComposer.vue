<script setup lang="ts">
/* eslint-disable vue/no-v-model-argument */
import { ref, watch } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Rating from "primevue/rating";
import Textarea from "primevue/textarea";
import { useReviewStore } from "../stores/ReviewStore";
import type { IMovie, IReview } from "@filmeye/common";

const props = defineProps<{
    movie: IMovie;
    review?: IReview;
}>();
const emit = defineEmits(["close"]);

const reviewStore = useReviewStore();
const visible = ref(true);
const rating = ref(props.review?.rating ?? 0);
const message = ref(props.review?.message ?? "");

if (!props.movie)
    emit("close");

async function submitReview() {
    await reviewStore.createReview({
        movieId: props.movie.id,
        rating: rating.value,
        message: message.value,
    });
    visible.value = false;
}

watch(() => visible.value, (newValue) => {
    if (!newValue) emit("close");
});
</script>

<template>
    <Dialog v-model:visible="visible" modal :header="`Review for ${movie.title}`" :style="{ width: '50vw' }">
        <div class="fields">
            <div class="field">
                <label for="rating">Rating</label>
                <Rating id="rating" v-model="rating" :cancel="false" />
            </div>

            <div class="field mt-5">
                <span class="p-float-label">
                    <Textarea inputId="message" v-model="message" rows="5" cols="50" />
                    <label for="message">Write your review here...</label>
                </span>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="visible = false" text />
            <Button label="Submit" icon="pi pi-check" @click="submitReview" autofocus />
        </template>
    </Dialog>
</template>

<style scoped>

</style>