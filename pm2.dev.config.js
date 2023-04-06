const env = {
    NODE_ENV: "development",
};

module.exports = {
    apps: [
        {
            name: "api",
            namespace: "webdev2-dev",
            watch: ["./packages/api/src"],
            interpreter: "bash",
            script: "pnpm",
            args: "api:start",
            log_date_format: "YYYY-MM-DD HH:mm Z",
            env,
        },
        {
            name: "app",
            namespace: "webdev2-dev",
            interpreter: "bash",
            script: "pnpm",
            args: "app:dev",
            log_date_format: "YYYY-MM-DD HH:mm Z",
            env,
        },
    ],
};