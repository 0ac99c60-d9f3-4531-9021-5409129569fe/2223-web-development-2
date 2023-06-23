import { IReview } from "../IReview";

export interface APIReviewBody {
    message: string;
    rating: number;
}

export type APIReviewResponse = {
    count: number;
    reviews: IReview[];
};