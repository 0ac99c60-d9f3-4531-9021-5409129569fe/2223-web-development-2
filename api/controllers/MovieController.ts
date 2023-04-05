import { Body, Controller, Delete, Get, Params, Patch, Post, Response } from "@decorators/express";
import type { Response as RESTResponse } from "express";
import { Movie } from "../models/Movie";

@Controller("/movies")
export class MovieController {
    @Get("/:id")
    async getMovie(@Response() res: RESTResponse, @Params("id") id: string) {
        try {
            const movie = await Movie.findById(id, { Password: false});

            if (movie === null) {
                return res.status(404).json({
                    message: "Movie not found",
                });
            }

            res.status(200).json(movie);
        } catch (err) {
            if (err instanceof MongooseError.CastError && err.kind === "ObjectId") {
                return res.status(404).json({
                    message: "Movie not found",
                });
            }

            console.error(err);
            res.status(500).json({
                message: "An error occured",
                error: err,
            });
        }
    }

    @Get("/")
    async getMovies(@Response() res: RESTResponse) {
        try {
            const movies = await Movie.find(null, { Password: false });

            res.status(200).json(movies);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "An error occured",
                error: err,
            });
        }
    }

    @Post("/")
    async addMovie(@Response() res: RESTResponse, @Body() body: IMovie) {
        try {
            const movie = new Movie(body);
            await movie.save();

            res.status(201).json(movie);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "An error occured",
                error: err,
            });
        }
    }

    @Patch("/:id")
    async updateMovie(@Response() res: RESTResponse, @Params("id") id: string, @Body() body: Partial<IMovie>) {
        try {
            const movie = await Movie.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true,
            });
            if (movie === null) {
                return res.status(404).json({
                    message: "Movie not found",
                });
            }

            res.status(200).json(movie);
        } catch (err) {
            if (err instanceof MongooseError.CastError && err.kind === "ObjectId") {
                return res.status(404).json({
                    message: "Movie not found",
                });
            }

            console.error(err);
            res.status(500).json({
                message: "An error occured",
                error: err,
            });
        }
    }

    @Delete("/:id")
    async deleteMovie(@Response() res: RESTResponse, @Params("id") id: string) {
        try {
            const movie = await Movie.findByIdAndDelete(id);
            res.status(200).json(movie);
        } catch (err) {
            if (err instanceof MongooseError.CastError && err.kind === "ObjectId") {
                return res.status(404).json({
                    message: "Movie not found",
                });
            }

            console.error(err);
            res.status(500).json({
                message: "An error occured",
                error: err,
            });
        }
    }
}