/**
 * PublicController
 *
 * @description :: Server-side logic for managing public
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');

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
            res.ok({count: count});

        })

    },

    getTotalActiveUsers: function (req, res) {
        Users.count().exec(function(ko, count){
            if(ko){
                res.serverError(ko);
            }
            res.ok({count: count});

        })

    },

    getContribByCategory: function (req, res) {


        statistics.getStatistics(1).then(
            function(sumA){
                statistics.getStatistics(2).then(
                    function(sumB){
                        statistics.getStatistics(3).then(
                            function(sumC){
                                statistics.getStatistics(4).then(
                                    function(sumD){
                                        statistics.getStatistics(5).then(
                                            function(sumE){
                                                statistics.getStatistics(6).then(
                                                    function(sumF){
                                                        statistics.getStatistics(7).then(
                                                            function(sumG){
                                                                statistics.getStatistics(8).then(
                                                                    function(sumH){
                                                                        var response = {
                                                                            A: {
                                                                                count: sumA,
                                                                                cat: "Cultura"
                                                                            },
                                                                            B: {
                                                                                count: sumB,
                                                                                cat: "Economía"
                                                                            },
                                                                            C: {
                                                                                count: sumC,
                                                                                cat: "Educación"
                                                                            },
                                                                            D: {
                                                                                count: sumD,
                                                                                cat: "Medio Ambiente"
                                                                            },
                                                                            E: {
                                                                                count: sumE,
                                                                                cat: "Medios de Comunicación"
                                                                            },
                                                                            F: {
                                                                                count: sumF,
                                                                                cat: "Política"
                                                                            },
                                                                            G: {
                                                                                count: sumG,
                                                                                cat: "Sanidad"
                                                                            },
                                                                            H: {
                                                                                count: sumH,
                                                                                cat: "Otros Temas"
                                                                            }
                                                                        };

                                                                        res.ok(response);

                                                                    }

                                                                )
                                                            }
                                                        )
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )

    },

    getTotalReceivedMsg: function (req, res) {
        Classify.count({type:2}).exec(function (ko, count){
            if(ko){
                res.serverError(ko);
            }
            res.ok({count: count});

        })

    },

    getTotalReceivedImg: function (req, res) {
        Classify.count({type:1}).exec(function (ko, count){
            if(ko){
                res.serverError(ko);
            }
            res.ok({count: count});

        })

    },

    getTodayContribNum: function (req, res) {
        var now = moment();
        var nowDay = now.date();
        var nowMonth = now.month()+1;
        var nowYear = now.year();
        var future = now.add(1, 'days');
        var futureDay = future.date();
        var futureMonth = future.month()+1;
        var futureYear = now.year();
        var today = new Date(nowYear+'-'+nowMonth+'-'+nowDay);
        var tomorrow = new Date (futureYear+'-'+futureMonth+'-'+futureDay);

       Classify.count({createdAt:{'>=': today, '<': tomorrow } }).exec(function(ko, count){
           if(ko){
               res.serverError(ko);
           }

           res.ok({count: count});
       })

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

