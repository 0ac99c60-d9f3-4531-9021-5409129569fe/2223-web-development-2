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
            restart_delay: 15e3,
            max_restarts: 10,
            log_date_format: "YYYY-MM-DD HH:mm Z",
            env,
        },
    ],
};
