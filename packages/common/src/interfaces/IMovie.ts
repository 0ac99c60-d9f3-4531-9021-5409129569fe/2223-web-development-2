export interface IMovie {
    id: number;
    title: string;
    genre_ids?: number[];
    genres?: {
        id: number;
        name: string;
    }[];
    original_language: string;
    original_title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    adult: boolean;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    popularity?: number;
    runtime?: number;
}