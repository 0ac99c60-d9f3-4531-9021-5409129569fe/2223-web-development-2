import { DataSource } from "typeorm";
import { User } from "@api/models/User";
import { Movie } from "@api/models/Movie";

let database: DataSource;

export async function initializeDatabase() {
    const dataSource = new DataSource({
        type: "sqlite",
        database: "./data/db.sqlite",
        entities: [
            User,
            Movie,
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