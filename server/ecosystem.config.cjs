module.exports = {
    apps: [
       { 
        name:"warehouse-management",
        script:"npm",
        args:"run dev",
        env:{
        NODE_ENV:"development",
        ENV_VAR1:"enviroment-variable",
        NODE_EXTRA_CA_CERTS: "/etc/ssl/certs/rds/global-bundle.pem",
        }
    }
    ]
}