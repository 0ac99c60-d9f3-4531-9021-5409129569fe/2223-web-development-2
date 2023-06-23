import { ref } from "vue";
import { defineStore } from "pinia";
import { HTTPUtils } from "@app/utils/HTTPUtils";
import type { APIReviewResponse, IReview } from "@filmeye/common";

export const useReviewStore = defineStore("review", () => {
    const reviews = ref<APIReviewResponse>(null);

    async function fetchReviewsForMovie({
        movieId = null,
        offset = 0,
        limit = 10,
    }: {
        movieId?: string;
        userId?: number;
        offset?: number;
        limit?: number;
    }) {
        let url = `/movies/${movieId}/reviews`;
        if (offset !== 0 || limit !== 10)
            url += `?offset=${offset}&limit=${limit}`;

        const [res, data] = await HTTPUtils.get<APIReviewResponse>(url);
        if (res.ok)
            reviews.value = data;

        return data;
    }

    async function createReview({
        movieId,
        rating,
        message,
    }: {
        movieId?: number;
        rating?: number;
        message?: string;
    }) {
        const url = `/movies/${movieId}/reviews`;
        const [res, data] = await HTTPUtils.post<IReview>(url, {
            auth: true,
            body: {
                rating,
                message,
            },
        });
        if (res.ok) {
            reviews.value.count++;
            reviews.value.reviews.push(data);
        }

        return data;
    }

    function $reset() {
        reviews.value = null;
    }

    return {
        reviews,
        fetchReviewsForMovie,
        createReview,
        $reset,
    };
});