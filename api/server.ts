import "reflect-metadata";

import express from "express";
import { Controller, attachControllers } from "@decorators/express";
import { initializeDatabase } from "./database";
import { UserController } from "./controllers/UserController";
import { MovieController } from "./controllers/MovieController";

// const PORT = 8082;
const app = express();
const router = express.Router();

await initializeDatabase();

attachControllers(router, [
    UserController,
    // MovieController,
]);

router.use(express.json());
app.use("/api", router);


// app.listen(PORT, () => {
//     console.log(`Listening on port: ${PORT}\nhttp://localhost:${PORT}`);
// });

export const handler = app;