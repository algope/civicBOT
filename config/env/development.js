/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the development       *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

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
            host: process.env.DB_URL,
            port: 27017,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    },

    models: {
        connection: 'mongodb',
        migrate: 'safe'


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
        bucket: 'civicbotcdn',
        cloudFrontUrl: 'http://d3bjzxyw6dh8fr.cloudfront.net/'
    },

    port: 8080,

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
        level: "verbose"
    }
};
