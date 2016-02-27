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

    }, //CHECKED!

    getTotalContributions: function (req, res) {
        Classify.count({published: true}).exec(function(ko, count){
            if(ko){
                res.serverError(ko);
            }
            res.ok({count: count});

        })

    }, //CHECKED!

    getTotalActiveUsers: function (req, res) {
        Users.count().exec(function(ko, count){
            if(ko){
                res.serverError(ko);
            }
            res.ok({count: count});

        })

    }, //CHECKED!

    getContribByCategory: function (req, res) {
        statistics.getStatistics("A").then(
            function(sumA){
                statistics.getStatistics("B").then(
                    function(sumB){
                        statistics.getStatistics("C").then(
                            function(sumC){
                                statistics.getStatistics("D").then(
                                    function(sumD){
                                        statistics.getStatistics("E").then(
                                            function(sumE){
                                                statistics.getStatistics("F").then(
                                                    function(sumF){
                                                        statistics.getStatistics("G").then(
                                                            function(sumG){
                                                                statistics.getStatistics("H").then(
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

    }, //CHECKED!

    getTotalReceivedMsg: function (req, res) {
        Classify.count({type: 2}).exec(function (ko, count){
            if(ko){
                res.serverError(ko);
            }
            sails.log.info("COUNT: "+JSON.stringify(count));
            res.ok({count: count});

        })

    }, //CHECKED!

    getTotalReceivedImg: function (req, res) {
        Classify.count({type: 1}).exec(function (ko, count){
            if(ko){
                res.serverError(ko);
            }
            res.ok({count: count});

        })

    }, //CHECKED!

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
        TopParties.find().populate('party').exec(function (ko, ok){
            if(ko){
                res.serverError(ko);
            }else if(ok){
                res.ok(ok);
            }
        });



        /*

        Party.count().exec(function(err, count){
            Classify.find({published: true}).populate('party').exec(function(err, contributions){

                var partyCount = Array.apply(null, Array(count+1)).map(Number.prototype.valueOf,0);
                for(var i=0; i<contributions.length; i++){
                    partyCount[contributions[i].party.id]++;
                }
                var index1 = partyCount.indexOf(Math.max.apply(Math, partyCount));
                var count1 = partyCount[index1];
                partyCount[index1]=0;
                var index2 = partyCount.indexOf(Math.max.apply(Math, partyCount));
                var count2 = partyCount[index2];

                if(index2 == 0){
                    index2 = index1;
                    count2 = count1;
                }

                Party.findOne({id: index1}).exec(function(ko, party1){
                    if(ko){
                        res.serverError(ko);
                    }
                    else if(party1){
                        var p1 = party1;
                        Party.findOne({id: index2}).exec(function(ko, party2){
                            if(ko){
                                res.serverError(ko);
                            }
                            else if(party2){

                                var p2=party2;
                                var result = [];
                                result.push({id: p1.id, party: p1.party, count: count1});
                                result.push({id: p2.id, party: p2.party, count: count2});

                                res.ok(result);


                            }


                        })

                    }


                })
            })

        });

        */



    },

    getTopLocations: function (req, res) {
        TopLocations.find().populate('location').exec(function (ko, ok){
            if(ko){
                res.serverError(ko);
            }else if(ok){
                res.ok(ok);
            }
        });

    },

    getTopMedia: function (req, res) {
        TopMedia.find().populate('media').exec(function (ko, ok){
            if(ko){
                res.serverError(ko);
            }else if(ok){
                res.ok(ok);
            }
        });

    },


    getTopPartiesByMonth: function (req, res) {
        //TODO: HARDCODED
        TopParties.find().populate('party').exec(function (ko, ok){
            if(ko){
                res.serverError(ko);
            }else if(ok){
                res.ok(ok);
            }
        });


    },

    getTopLocationsByMonth: function (req, res) {
        //TODO: HARDCODED
        TopLocations.find().populate('location').exec(function (ko, ok){
            if(ko){
                res.serverError(ko);
            }else if(ok){
                res.ok(ok);
            }
        });

    },

    getTopCategoryByMonth: function (req, res) {
        //TODO: HARDCODED
        statistics.getStatistics("A").then(
            function(sumA){
                statistics.getStatistics("B").then(
                    function(sumB){
                        statistics.getStatistics("C").then(
                            function(sumC){
                                statistics.getStatistics("D").then(
                                    function(sumD){
                                        statistics.getStatistics("E").then(
                                            function(sumE){
                                                statistics.getStatistics("F").then(
                                                    function(sumF){
                                                        statistics.getStatistics("G").then(
                                                            function(sumG){
                                                                statistics.getStatistics("H").then(
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

    getTopMediaByMonth: function (req, res) {
        //TODO: HARDCODED
        TopMedia.find().populate('media').exec(function (ko, ok){
            if(ko){
                res.serverError(ko);
            }else if(ok){
                res.ok(ok);
            }
        });

    }

};

