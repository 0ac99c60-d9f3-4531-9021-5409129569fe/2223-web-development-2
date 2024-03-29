import type { IUser } from "./IUser";
import type { IMovie } from "./IMovie";

export interface IReview {
    id: number;
    user: IUser;
    movie: IMovie;
    message: string;
    rating: number;
    createdAt: Date;
}