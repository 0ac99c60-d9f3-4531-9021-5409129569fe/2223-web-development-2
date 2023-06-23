import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IMovie, IMovieResponse } from "@filmeye/common";
import { HTTPUtils } from "../utils/HTTPUtils";

export const useMovieStore = defineStore("movie", () => {
    const trendingMovies = ref<IMovie[]>([]);
    const upcomingMovies = ref<IMovie[]>([]);

    async function fetchTrending() {
        const [res, data] = await HTTPUtils.get<IMovieResponse>("/movies/trending");
        if (res.ok)
            trendingMovies.value = data.results;
    }

    async function fetchUpcoming() {
        const [res, data] = await HTTPUtils.get<IMovieResponse>("/movies/upcoming");
        if (res.ok)
            upcomingMovies.value = data.results;
    }

    return {
        trendingMovies,
        upcomingMovies,
        fetchTrending,
        fetchUpcoming,
    };
});
