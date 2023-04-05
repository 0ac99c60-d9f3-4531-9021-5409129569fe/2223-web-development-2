import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100 })
    username: string;

    @Column("varchar", { length: 100 })
    password: string;

    @Column("blob")
    profilePicture: string;

    @Column("datetime")
    createdAt: Date;
}