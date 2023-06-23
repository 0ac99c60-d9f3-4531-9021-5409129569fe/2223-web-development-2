import { Body, Controller, Delete, Get, Params, Patch, Post, Query, Response } from "@decorators/express";
import type { Response as RESTResponse } from "express";
import type { APIReviewBody, IMovie, IMovieResponse } from "@filmeye/common";
import { ReviewService } from "@api/services/ReviewService";
import { userRequired } from "@api/middleware/userRequired";
import { UserService } from "@api/services/UserService";
import { MovieService } from "@api/services/MovieService";
import { TmdbService } from "../services/TmdbService";

@Controller("/movies")
export class MovieController {
    private reviewService: ReviewService;
    private userService: UserService;
    private movieService: MovieService;

    constructor() {
        this.reviewService = new ReviewService();
        this.userService = new UserService();
        this.movieService = new MovieService();
    }

    @Get("/trending")
    async getTrendingMovies(@Response() res: RESTResponse) {
        const [response, data] = await TmdbService.fetchTMDB<IMovieResponse>("/trending/movie/day");
        if (!response.ok)
            return res.status(404).json({
                message: "Trending movies not found",
            });
        return data;
    }

    @Get("/upcoming")
    async getUpcomingMovies(@Response() res: RESTResponse) {
        const [response, data] = await TmdbService.fetchTMDB<IMovieResponse>("/movie/upcoming");
        if (!response.ok)
            return res.status(404).json({
                message: "Upcoming movies not found",
            });
        return data;
    }

    @Get("/:movieId")
    async getMovie(@Response() res: RESTResponse, @Params("movieId") id: number) {
        const [response, data] = await TmdbService.fetchTMDB<IMovie>(`/movie/${id}`);
        if (!response.ok)
            return res.status(404).json({
                message: "Movie not found",
            });
        return data;
    }

    @Get("/:movieId/reviews")
    async getReviews(@Response() res: RESTResponse, @Params("movieId") movieId: number, @Query("offset") offset = "0", @Query("limit") limit = "10") {
        const newReviews = await this.reviewService.getReviews({
            movieId,
            offset: parseInt(offset),
            limit: parseInt(limit),
        });

        if (newReviews === null)
            return res.status(404).json({
                message: "Movie not found",
            });

        const json = {
            count: newReviews.count,
            reviews: newReviews.reviews.map(review => review.toJSON()),
        };
        res.status(200).json(json);
    }

    @Post("/:movieId/reviews", [userRequired])
    async addReview(@Response() res: RESTResponse, @Params("movieId") movieId: number, @Body() body: APIReviewBody) {
        const user = await this.userService.getUser(res.user.id);
        let movie = await this.movieService.getMovie(movieId);

        if (!movie) {
            const [res, data] = await TmdbService.fetchTMDB<IMovie>(`/movie/${movieId}`);
            if (res.ok)
                movie = await this.movieService.createMovie(data);
        }

        if (!movie)
            return res.status(404).json({
                message: "Movie not found",
            });

        const review = await this.reviewService.createReview(user, movie, body);
        res.status(201).json(review.toJSON());
    }
}