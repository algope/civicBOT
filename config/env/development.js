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

    models: {
        connection: 'testingMySQL',
        migrate: 'alter'
    },

    mixpanel: {
        token: '3386fca1c2c5187f9bb742afc6344129'
    },

    telegram: {
        token: '169302702:AAEN11zzvrPKMfT8dWY5PVESzng0HcctoQs'
    },

    port: 80,

    orm: {
        _hookTimeout: 30000
    },
    pubsub: {
        _hookTimeout: 30000
    }
};
