import express from "express";
import cors from "cors";
import { attachControllers } from "@decorators/express";
import { initializeDatabase } from "@api/database";
import { UserController } from "@api/controllers/UserController";
import { MovieController } from "@api/controllers/MovieController";

const PORT = 8082;
const app = express();
const router = express.Router();

async function run() {
    await initializeDatabase();
}
run();

attachControllers(router, [
    UserController,
    // MovieController,
]);

router.use(express.json());

app.use(cors());
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}\nhttp://localhost:${PORT}`);
});

export const handler: express.Express = app;