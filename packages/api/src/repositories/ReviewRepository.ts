import { getDatabase } from "@api/database";
import { Movie } from "@api/models/Movie";
import { Review } from "@api/models/Review";
import { User } from "@api/models/User";
import type { APIReviewBody } from "@filmeye/common";

export class ReviewRepository {
    async getReviews({
        movieId = null,
        userId = null,
        offset = 0,
        limit = 10,
    }: {
        movieId?: number;
        userId?: number;
        offset?: number;
        limit?: number;
    }) {
        const count = await Review.count({
            where: {
                movie: {
                    id: movieId,
                },
                user: {
                    id: userId,
                },
            },
            relations: {
                movie: true,
                user: true,
            },
        });
        const reviews = await Review.find({
            where: {
                movie: {
                    id: movieId,
                },
                user: {
                    id: userId,
                },
            },
            relations: {
                movie: true,
                user: true,
            },
            skip: offset,
            take: limit,
        });
        if (count === null && reviews === null) return null;
        return {
            count,
            reviews: reviews ?? [],
        };
    }

    async getReview(reviewId: number) {
        const review = await Review.findOne({
            where: {
                id: reviewId,
            },
            relations: {
                movie: true,
                user: true,
            },
        });
        if (!review) return null;
        return review;
    }

    async createReview(user: User, movie: Movie, body: APIReviewBody) {
        const review = new Review();
        review.user = user;
        review.movie = movie;
        review.message = body.message;
        review.rating = body.rating;
        review.createdAt = new Date();

        await getDatabase().manager.save(review);

        if (!review) return null;
        return review;
    }

    async updateReview(review: Review, body: APIReviewBody) {
        review.message = body.message;
        review.rating = body.rating;

        await getDatabase().manager.save(review);

        if (!review) return null;
        return review;
    }

    async deleteReview(review: Review) {
        await getDatabase().manager.delete(Review, review);

        if (!review) return false;
        return true;
    }
}