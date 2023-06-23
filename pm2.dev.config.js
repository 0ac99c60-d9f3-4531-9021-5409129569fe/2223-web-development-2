const env = {
    NODE_ENV: "development",
};

module.exports = {
    apps: [
        {
            name: "api",
            namespace: "webdev2-dev",
            interpreter: "bash",
            script: "pnpm",
            args: "api:start",
            watch: ["packages/api/src"],
            restart_delay: 4e3,
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