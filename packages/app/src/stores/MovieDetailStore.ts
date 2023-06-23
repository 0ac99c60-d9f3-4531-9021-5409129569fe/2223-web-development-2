import { ref } from "vue";
import { defineStore } from "pinia";
import { HTTPUtils } from "@app/utils/HTTPUtils";
import type { IMovie } from "@filmeye/common";

export const useMovieDetailStore = defineStore("movieDetail", () => {
    const movie = ref<IMovie>(null);

    async function fetchMovie(movieId: string) {
        const [res, data] = await HTTPUtils.get<IMovie>(`/movies/${movieId}`);
        if (res.ok)
            movie.value = data;
    }

    function $reset() {
        movie.value = null;
    }

    return {
        movie,
        fetchMovie,
        $reset,
    };
});