import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";

const PORT = 4000;

const isTest = process.env.NODE_ENV === "test";

async function createServerMiddleware(
    root = process.cwd(),
    isProd = process.env.NODE_ENV === "production"
) {
    const resolve = (p) => path.resolve(fileURLToPath(new URL("./", import.meta.url)), p);

    const app = express();

    /**
      * @type {import('vite').ViteDevServer}
      */
    let vite;
    if (isProd) {
        // TODO: app.use(require('compression')());
        app.use(express.static(resolve("./dist")));
    } else {
        vite = await createServer({
            root,
            logLevel: isTest ? "error" : "info",
            appType: "custom",
            server: {
                middlewareMode: true,
                watch: {
                    // During tests we edit the files too fast and sometimes chokidar
                    // misses change events, so enforce polling for consistency
                    usePolling: true,
                    interval: 100,
                },
            },
        });
        // use vite's connect instance as middleware
        app.use(vite.middlewares);
    }

    app.use("*", async (req, res) => {
        const url = req.originalUrl;

        const template = fs.readFileSync(
            resolve(isProd ? "./dist/index.js" : "./index.html"),
            "utf-8"
        );

        res.status(200).set({ "Content-Type": "text/html" }).end(template);
    });

    return { app, vite };
}

if (!isTest) {
    createServerMiddleware().then(({ app }) =>
        app.listen(PORT, () => {
            console.log(`Listening on http://localhost:${PORT}`);
        })
    );
}

// for test use
export const _createServer = createServerMiddleware;