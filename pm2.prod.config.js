const env = {
    NODE_ENV: "production",
};

module.exports = {
    apps: [
        {
            name: "api",
            namespace: "webdev2-prod",
            interpreter: "bash",
            script: "pnpm",
            args: "api:start",
            log_date_format: "YYYY-MM-DD HH:mm Z",
            env,
        },
    ],
};
