import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Movie } from "@app/interfaces/Movie";
import type { MovieResponse } from "@app/interfaces/MovieResponse";

export const useMovieStore = defineStore("movie", () => {
    const trendingMovies = ref<Movie[]>([]);
    const upcomingMovies = ref<Movie[]>([]);

    async function fetchTrending() {
        const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=19a7019cb94d9af0e9e16e399e57ec8b");
        const data = await res.json() as MovieResponse;
        if (res.ok)
            trendingMovies.value = data.results;
    }

    async function fetchUpcoming() {
        const res = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=19a7019cb94d9af0e9e16e399e57ec8b");
        const data = await res.json() as MovieResponse;
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
