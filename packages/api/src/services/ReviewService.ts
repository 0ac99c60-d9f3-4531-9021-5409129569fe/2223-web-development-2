import { Movie } from "@api/models/Movie";
import { Review } from "@api/models/Review";
import { User } from "@api/models/User";
import { MovieRepository } from "@api/repositories/MovieRepository";
import { ReviewRepository } from "@api/repositories/ReviewRepository";
import { UserRepository } from "@api/repositories/UserRepository";
import type { APIReviewBody } from "@filmeye/common";

export class ReviewService {
    private reviewRepository: ReviewRepository;
    private userRepository: UserRepository;
    private movieRepository: MovieRepository;

    constructor() {
        this.reviewRepository = new ReviewRepository();
        this.userRepository = new UserRepository();
        this.movieRepository = new MovieRepository();
    }

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
    }): Promise<{ count: number; reviews: Review[] }> {
        return this.reviewRepository.getReviews({
            movieId,
            userId,
            offset,
            limit,
        });
    }

    async getReview(reviewId: number): Promise<Review> {
        return this.reviewRepository.getReview(reviewId);
    }

    async createReview(user: User, movie: Movie, body: APIReviewBody) {
        return this.reviewRepository.createReview(user, movie, body);
    }

    async updateReview(user: User, reviewId: number, body: APIReviewBody) {
        const review = await this.reviewRepository.getReview(reviewId);
        if (!review)
            return null;

        if (review.user.id !== user.id)
            throw new Error("You are not allowed to update this review", { cause: "UNAUTHORIZED" });

        return this.reviewRepository.updateReview(review, body);
    }

    async deleteReview(user: User, reviewId: number) {
        const review = await this.reviewRepository.getReview(reviewId);
        if (!review)
            return null;

        if (review.user.id !== user.id)
            throw new Error("You are not allowed to delete this review", { cause: "UNAUTHORIZED" });

        return this.reviewRepository.deleteReview(review);
    }
}