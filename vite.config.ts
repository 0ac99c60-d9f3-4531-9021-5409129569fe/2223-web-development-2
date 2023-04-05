import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { esbuildDecorators } from "@anatine/esbuild-decorators";
import mix from "./plugins/vite-plugin-mix";
import { join, resolve } from "node:path";

// TODO: just use pm2 and run a monorepo...

// https://vitejs.dev/config/
export default defineConfig({
    root: "./app",
    plugins: [
        vue(),
        mix({
            handler: resolve(join(__dirname, "./api/server.ts")),
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./app", import.meta.url)),
            "api": fileURLToPath(new URL("./api", import.meta.url)),
        },
    },
    optimizeDeps: {
        // exclude: ["plugins"],
        esbuildOptions: {
            plugins: [
                esbuildDecorators({
                    tsconfig: "./tsconfig.json",
                }),
            ],
        },
    },
});
