module.exports.newrelic = {
    app_name: ['civicbot'],
    license_key: '4dec66ad73000a38a611588045f5d8c88fd2870a',
    logging: {
        level: 'warn', // can be error, warn, info, debug or trace
        rules: {
            ignore: ['^/socket.io/*/xhr-polling']
        }
    }
};