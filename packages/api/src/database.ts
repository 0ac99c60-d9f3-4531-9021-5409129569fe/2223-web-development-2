import { DataSource } from "typeorm";
import { User } from "@api/models/User";
import { Movie } from "@api/models/Movie";
import { Review } from "@api/models/Review";
import { Watchlist } from "@api/models/Watchlist";

let database: DataSource;

export async function initializeDatabase() {
    const dataSource = new DataSource({
        type: "sqlite",
        database: "./data/db.sqlite",
        entities: [
            User,
            Movie,
            Review,
            Watchlist,
        ],
        synchronize: true,
        logging: false,
    });
    try {
        database = await dataSource.initialize();
    } catch (err) {
        console.error("Failed to connect to database:", err);
        throw err;
    }
}

export function getDatabase() {
    return database;
}