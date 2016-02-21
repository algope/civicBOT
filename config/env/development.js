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
        'defaults': 'devMySQL',
        devMySQL: {
            adapter: 'sails-mysql',
            host: 'civicbot.csprfbquesxu.us-east-1.rds.amazonaws.com',
            user: 'test',
            password: 'testing1357',
            database: 'devCivicBOT'
        }
    },

    models: {
        connection: 'devMySQL',
        migrate: 'safe'
    },

    mixpanel: {
        token: '3386fca1c2c5187f9bb742afc6344129'
    },

    telegram: {
        token: '169302702:AAEN11zzvrPKMfT8dWY5PVESzng0HcctoQs'
    },

    s3:{
        accessKeyId: 'AKIAJTAPDHL2Y45ISW7A',
        secretAccessKey: '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',
        bucket: 'civicbotcdn'
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
            secret: 'kjhasdfkayufgkausgyf78w43ralkfgakuygu7r3akfyg'
        }
    },

    log: {
        level: "verbose"
    }
};
