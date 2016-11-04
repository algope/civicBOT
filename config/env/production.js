/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    connections: {
        'defaults': 'mongodb',
        //devMySQL: {
        //  adapter: 'sails-mysql',
        //host: 'civicbot.csprfbquesxu.us-east-1.rds.amazonaws.com',
        //user: 'test',
        //password: 'testing1357',
        //database: 'devCivicBOT'
        //},

        mongodb: {
            adapter: 'sails-mongo',
            url: process.env.MONGO_URL
        }
    },

    models: {
        connection: 'mongodb',
        migrate: process.env.MIGRATION_TYPE


    },

    mixpanel: {
        token: process.env.MIXPANEL_TOKEN
    },

    telegram: {
        token: process.env.TELEGRAM_TOKEN
    },

    s3:{
        accessKeyId: process.env.S3_AK,
        secretAccessKey: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
        cloudFrontUrl: process.env.CLOUD_FRONT_URL
    },

    port: 80,

    orm: {
        _hookTimeout: 200000
    },
    pubsub: {
        _hookTimeout: 200000
    },

    globals:{
        authentication: {
            secret: process.env.AUTH_SECRET
        }
    },

    log: {
        level: process.env.LOG_LEVEL
    }
};