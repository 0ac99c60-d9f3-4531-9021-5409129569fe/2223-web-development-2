import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { Container } from "@decorators/di";
import { ERROR_MIDDLEWARE, attachControllers } from "@decorators/express";
import { initializeDatabase } from "@api/database";
import { errorMiddleware } from "@api/middleware/errorMiddleware";

import { AuthController } from "@api/controllers/AuthController";
import { UserController } from "@api/controllers/UserController";
import { MovieController } from "@api/controllers/MovieController";
import { ReviewController } from "./controllers/ReviewController";

const PORT = 8082;
const app = express();
const router = express.Router();

config();

async function run() {
    await initializeDatabase();
}
run();

attachControllers(router, [
    AuthController,
    UserController,
    MovieController,
    ReviewController
]);

router.use(express.json());

app.use(cors());
app.use("/api", router);

// handle 404
app.use((req, res) => {
    res.status(404).json({
        message: "Not found",
    });
});

Container.provide([
    { provide: ERROR_MIDDLEWARE, useValue: errorMiddleware }
]);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}\nhttp://localhost:${PORT}`);
});