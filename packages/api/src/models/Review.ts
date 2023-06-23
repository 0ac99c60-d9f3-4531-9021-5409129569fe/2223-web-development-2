import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "@api/models/Movie";
import { User } from "@api/models/User";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { cascade: true })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Movie, { cascade: true })
    @JoinColumn()
    movie: Movie;

    @Column("text")
    message: string;

    @Column("smallint")
    rating: number;

    @Column("datetime")
    createdAt: Date;

    toJSON() {
        return {
            id: this.id,
            user: this.user.toJSON(),
            movie: this.movie.toJSON(),
            message: this.message,
            rating: this.rating,
            createdAt: this.createdAt,
        };
    }
}