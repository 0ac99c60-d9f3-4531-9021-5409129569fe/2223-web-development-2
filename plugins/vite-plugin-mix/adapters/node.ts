import path from "path";
import type { Adapter } from "../types";

export const nodeAdapter = (): Adapter => {
    return {
        name: "node",

        rollupInput: {
            server: path.join(__dirname, "runtime/server.js"),
        },
    };
};