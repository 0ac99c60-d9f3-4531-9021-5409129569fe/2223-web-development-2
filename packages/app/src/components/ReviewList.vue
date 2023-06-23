<script setup lang="ts">
import { onMounted, ref } from "vue";
import Paginator, { type PageState } from "primevue/paginator";
import Divider from "primevue/divider";
import type { IReview } from "@filmeye/common";
import { useReviewStore } from "@app/stores/ReviewStore";
import Review from "@app/components/Review.vue";

const props = defineProps<{
    movieId: string;
}>();

const ReviewStore = useReviewStore();
const items = ref<IReview[]>([]);
const count = ref(0);
const offset = ref(0);
const limit = ref(10);

async function fetchAndStoreReviews(movieId: string, offset: number, limit: number) {
    const res = await ReviewStore.fetchReviewsForMovie({
        movieId: movieId,
        offset: offset,
        limit: limit,
    });
    items.value = res.reviews;
    count.value = res.count;
    return res;
}

async function changePage(pageState: PageState) {
    offset.value = pageState.first;
    limit.value = pageState.rows;

    await fetchAndStoreReviews(props.movieId, offset.value, limit.value);
}

onMounted(async () => {
    await fetchAndStoreReviews(props.movieId, offset.value, limit.value);
});
</script>

<template>
    <div>
        <div v-for="item in items" :key="item.id">
            <div class="pt-4">
                <Review :review="item" />
            </div>
        </div>
        <Divider />
        <Paginator :totalRecords="count" :rows="limit" :rowsPerPageOptions="[10, 20, 30]" @page="changePage" />
    </div>
</template>

<style>
.p-paginator {
    background-color: unset;
    border: 0;
    padding-top: 1rem;
}
</style>