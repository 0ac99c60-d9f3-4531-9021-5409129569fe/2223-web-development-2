import { API_ENDPOINT } from "@app/constants";

type RequestOptions = Omit<RequestInit, "body"> & {
    auth?: boolean;
    body?: any;
};

export const HTTPUtils = {
    async request<APIResponse extends {}>(method: string, endpoint: string, options: RequestOptions = {
        auth: true,
    }): Promise<[Response, APIResponse]> {
        options.headers ??= {};

        if (options.auth)
            options.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

        if (options.body) {
            if (!(options.body instanceof FormData) && typeof options.body === "object") {
                options.headers["Content-Type"] = "application/json";
                options.body = JSON.stringify(options.body);
            }
        }

        const res = await fetch(API_ENDPOINT + endpoint, {
            method,
            ...options,
        });
        const data = res.headers.get("Content-Type").startsWith("application/json")
            ? await res.json()
            : await res.text();
        return [res, data];
    },
    get<APIResponse extends {}>(endpoint: string, options: RequestOptions = {}) {
        return this.request<APIResponse>("GET", endpoint, options);
    },
    post<APIResponse extends {}>(endpoint: string, options: RequestOptions = {}) {
        return this.request<APIResponse>("POST", endpoint, options);
    },
    put<APIResponse extends {}>(endpoint: string, options: RequestOptions = {}) {
        return this.request<APIResponse>("PUT", endpoint, options);
    },
    delete<APIResponse extends {}>(endpoint: string, options: RequestOptions = {}) {
        return this.request<APIResponse>("DELETE", endpoint, options);
    },
};