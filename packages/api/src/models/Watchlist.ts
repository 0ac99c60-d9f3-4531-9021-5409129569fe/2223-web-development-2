import { BaseEntity, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "@api/models/Movie";
import { User } from "@api/models/User";

@Entity()
export class Watchlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Movie)
    @JoinTable()
    movies: Movie[];
}