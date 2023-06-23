import { Body, Controller, Delete, Params, Patch, Response } from "@decorators/express";
import type { Response as RESTResponse } from "express";
import { userRequired } from "@api/middleware/userRequired";
import { MovieService } from "@api/services/MovieService";
import { ReviewService } from "@api/services/ReviewService";
import { UserService } from "@api/services/UserService";
import type { APIReviewBody } from "@filmeye/common";

@Controller("/reviews")
export class ReviewController {
    private userService: UserService;
    private movieService: MovieService;
    private reviewService: ReviewService;

    constructor() {
        this.userService = new UserService();
        this.movieService = new MovieService();
        this.reviewService = new ReviewService();
    }

    @Patch("/:reviewId", [userRequired])
    async updateReview(@Response() res: RESTResponse, @Params("reviewId") reviewId: number, @Body() body: APIReviewBody) {
        const user = await this.userService.getUser(res.user.id);
        try {
            const review = await this.reviewService.updateReview(user, reviewId, body);

            if (!review)
                return res.status(404).json({
                    message: "Review not found",
                });

            res.status(200).json(review.toJSON());
        } catch (err) {
            if (err.cause === "UNAUTHORIZED")
                return res.status(401).json({
                    message: err.message,
                });
        }
    }

    @Delete("/:reviewId", [userRequired])
    async deleteReview(@Response() res: RESTResponse, @Params("reviewId") reviewId: number) {
        const user = await this.userService.getUser(res.user.id);
        const review = await this.reviewService.deleteReview(user, reviewId);
        try {
            if (!review)
                return res.status(404).json({
                    message: "Review not found",
                });

            res.status(204).json();
        } catch (err) {
            if (err.cause === "UNAUTHORIZED")
                return res.status(401).json({
                    message: err.message,
                });
        }
    }
}