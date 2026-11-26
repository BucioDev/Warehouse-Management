module.exports = {
    apps: [
        {
            name: "warehouse-management",
            script: "npm",
            args: "run dev",
            instances: 1,
            exec_mode: "fork",
            env: {
                NODE_ENV: "development",
                TZ: "America/Tijuana",
                ENV_VAR1: "enviroment-variable",
                NODE_EXTRA_CA_CERTS: "/etc/ssl/certs/rds/global-bundle.pem",
            }
        }
    ]
}