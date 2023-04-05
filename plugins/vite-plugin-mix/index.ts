import fs from "fs";
import path from "path";
import { type Plugin, build } from "vite";
import polka from "polka";
import { nodeAdapter } from "./adapters/node";
import type { Adapter } from "./types";
import { esbuildDecorators } from "@anatine/esbuild-decorators";

export * from "./types";

export { nodeAdapter };

// export { vercelAdapter } from "./adapters/vercel";

export default ({
    handler,
    adapter,
}: {
    handler: string
    adapter?: Adapter
}): Plugin => {
    let root = process.cwd();
    let clientOutDir: string | undefined;

    const getHandlerFile = () => path.resolve(root, handler);

    return {
        name: "mix",

        configResolved(config) {
            root = config.root;
            clientOutDir = path.resolve(root, config.build.outDir);
        },

        configureServer(devServer) {
            const handlerFile = getHandlerFile();
            devServer.config.optimizeDeps.esbuildOptions?.plugins?.push(
                esbuildDecorators({
                    tsconfig: path.resolve(path.join(handlerFile, "../tsconfig.json")),
                })
            );
            devServer.middlewares.use(async (req, res, next) => {
                try {
                    const mod = await devServer.ssrLoadModule(`/@fs/${handlerFile}`);
                    const server = polka({
                        onNoMatch: () => next(),
                    });
                    server.use((req: any, res: any, next: any) => {
                        req.viteServer = devServer;
                        next();
                    });
                    if (Array.isArray(mod.handler)) {
                        mod.handler.forEach((handler) => server.use(handler));
                    } else {
                        server.use(mod.handler);
                    }
                    server.handler(req as any, res);
                } catch (error) {
                    devServer.ssrFixStacktrace(error as Error);
                    process.exitCode = 1;
                    next(error);
                }
            });
        },

        async writeBundle() {
            if (process.env.MIX_SSR_BUILD) return;

            process.env.MIX_SSR_BUILD = "true";

            adapter = adapter || nodeAdapter();

            const serverOutDir = path.join(root, "build");

            const handlerFile = getHandlerFile();

            const buildOpts = { root, serverOutDir, clientOutDir: clientOutDir! };

            if (adapter.buildStart) {
                await adapter.buildStart(buildOpts);
            }

            const indexHtmlPath = path.join(clientOutDir!, "index.html");
            const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");
            fs.unlinkSync(indexHtmlPath);

            await build({
                root,
                resolve: {
                    alias: {
                        $handler_file: handlerFile,
                    },
                },
                define: {
                    "import.meta.env.MIX_CLIENT_DIR": JSON.stringify(
                        path.relative(process.cwd(), clientOutDir!),
                    ),
                    "import.meta.env.MIX_HTML": JSON.stringify(indexHtml),
                },
                build: {
                    outDir: serverOutDir,
                    emptyOutDir: true,
                    ssr: true,
                    rollupOptions: {
                        input: {
                            handler: handlerFile,
                            ...adapter.rollupInput,
                        },
                    },
                },
                // add plugin for decorator metadata
                optimizeDeps: {
                    esbuildOptions: {
                        plugins: [
                            esbuildDecorators({
                                tsconfig: "./tsconfig.json",
                            }),
                        ],
                    },
                },
            });

            if (adapter.buildEnd) {
                await adapter.buildEnd(buildOpts);
            }
        },
    };
};