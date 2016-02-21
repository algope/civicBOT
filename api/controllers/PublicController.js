/**
 * PublicController
 *
 * @description :: Server-side logic for managing public
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getContributionList: function (req, res) {
        Classify.find({published: true}).populate(['label', 'party', 'location', 'media']).exec(function(ko, contributions){
            if(ko){
                res.serverError(ko);
            }
            else if(contributions){
                res.ok(contributions);
            }

        });

    },

    getTotalContributions: function (req, res) {
        Classify.count({published: true}).exec(function(ko, count){
            if(ko){
                res.serverError(ko);
            }
            else if(count){
                res.ok({count: count});
            }
        })

    },

    getTotalActiveUsers: function (req, res) {

    },

    getContribByCategory: function (req, res) {

    },

    getTotalReceivedMsg: function (req, res) {

    },

    getTotalReceviedImg: function (req, res) {

    },

    getTodayContribNum: function (req, res) {

    },

    getTopParties: function (req, res) {

    },

    getTopLocations: function (req, res) {

    },

    getTopMedia: function (req, res) {

    },

    getTopPartiesByMonth: function (req, res) {

    },

    getTopLocationsByMonth: function (req, res) {

    },

    getTopCategoryByMonth: function (req, res) {

    },

    getTopMediaByMonth: function (req, res) {

    }

};

