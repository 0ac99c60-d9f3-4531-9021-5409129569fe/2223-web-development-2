import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./Review";

@Entity()
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("simple-array")
    genres: string[];

    @Column("varchar", { length: 50 })
    original_language: string;

    @Column()
    original_title: string;

    @Column("text")
    overview: string;

    @Column()
    backdrop_path: string;

    @Column()
    poster_path: string;

    @Column()
    adult: boolean;

    @Column("varchar", { length: 20 })
    release_date: string;

    @OneToMany(() => Review, review => review.movie)
    reviews: Review[];

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            genres: this.genres,
            original_language: this.original_language,
            original_title: this.original_title,
            overview: this.overview,
            backdrop_path: this.backdrop_path,
            poster_path: this.poster_path,
            adult: this.adult,
            release_date: this.release_date,
        };
    }
}