const config = {
    user: 'Admin',
    password: 'admin',
    server: 'DESKTOP-H80NV29',
    database: 'AimTrainerDB',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS',
        encrypt: false
    },
    port: 1433
}

module.exports = config