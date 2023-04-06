import type { Movie } from "@app/interfaces/Movie";

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}