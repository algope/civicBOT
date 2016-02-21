/**
 * PublicController
 *
 * @description :: Server-side logic for managing public
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getImgByID: function (req, res) {
        var id=req.param('id');
        telegram.getFile(id).then(function (response){
            res.json(200,response);
        });





    },

    getContributionList: function (req, res) {

    },

    getTotalContributions: function (req, res) {

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

