import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    root: "./src",
    plugins: [vue()],
    build: {
        outDir: "../dist",
    },
    resolve: {
        alias: {
            "@app": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
