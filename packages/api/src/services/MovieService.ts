import { MovieRepository } from "@api/repositories/MovieRepository";
import { IMovie } from "packages/common/src";

export class MovieService {
    private movieRepository: MovieRepository;

    constructor() {
        this.movieRepository = new MovieRepository();
    }

    async getMovie(movieId: number) {
        return this.movieRepository.getMovie(movieId);
    }

    async createMovie(movie: IMovie) {
        return this.movieRepository.createMovie(movie);
    }
}