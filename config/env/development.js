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
        connection: 'prodMySQL',
        migrate: 'safe'
    },

    mixpanel: {
        token: '2ac0d6d54c481e7dea88d065874c806f'
    },

    telegram: {
        token: '173495687:AAFVVTAyeS9Sq3Y1bzZ_EwR5il0YuBDF8_I'
    },

    port: 80,

    orm: {
        _hookTimeout: 30000
    },
    pubsub: {
        _hookTimeout: 30000
    }
};
