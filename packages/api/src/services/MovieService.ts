import { MovieRepository } from "@api/repositories/MovieRepository";

export class MovieService {
    constructor(private movieRepository: MovieRepository) {
        this.movieRepository = new MovieRepository();
    }

    async get(movieId: number) {
        return this.movieRepository.getMovie(movieId);
    }
}