const isDev = import.meta.env.MODE === "development";

export const API_ENDPOINT = isDev ? "//localhost:8082/api" : "/api";