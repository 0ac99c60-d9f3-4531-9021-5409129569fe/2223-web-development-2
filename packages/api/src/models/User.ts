import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Watchlist } from "@api/models/Watchlist";
import { Review } from "@api/models/Review";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100, unique: true })
    username: string;

    @Column("varchar", { length: 100 })
    password: string;

    @Column("varchar", { length: 100 })
    displayName: string;

    @Column("blob")
    profilePicture: Buffer;

    @Column("datetime")
    createdAt: Date;

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];

    @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
    watchlist: Watchlist[];

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            profilePicture: `data:image/png;base64,${Buffer.from(this.profilePicture).toString("base64")}`,
            createdAt: this.createdAt,
        };
    }
}