import { Movie } from "@api/models/Movie";

export class MovieRepository {
    constructor() { }

    async getMovie(movieId: number) {
        return Movie.findOneBy({ id: movieId });
    }
}