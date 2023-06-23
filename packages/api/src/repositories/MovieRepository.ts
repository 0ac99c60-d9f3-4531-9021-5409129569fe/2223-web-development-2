import { Movie } from "@api/models/Movie";
import { IMovie } from "@filmeye/common";

export class MovieRepository {
    async getMovie(movieId: number) {
        return Movie.findOneBy({ id: movieId });
    }

    async createMovie(body: IMovie) {
        const movie = new Movie();
        movie.id = body.id;
        movie.title = body.title;
        movie.genres = body.genres.map(genre => genre.name);
        movie.overview = body.overview;
        movie.original_language = body.original_language;
        movie.original_title = body.original_title;
        movie.poster_path = body.poster_path;
        movie.backdrop_path = body.backdrop_path;
        movie.release_date = body.release_date;
        movie.adult = body.adult;
        await movie.save();
        return movie;
    }
}