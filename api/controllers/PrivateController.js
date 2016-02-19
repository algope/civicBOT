/**
 * PrivateController
 *
 * @description :: Server-side logic for managing privates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getPartyList: function (req, res){

    },

    getLocationList: function (req, res){

    },



    setParty: function (req, res){

    },

    setMedia: function (req, res){

    },

    setLocation: function (req, res){
        var id= req.body.contribId;
        var location = req.body.locationId;

        if(!id || !location){
            return res.badRequest("Parameters Expected");
        }
        else{
            Location.find({id: id}).exec(function (ko, ok){
                if(ko){
                    res.serverError(ko);
                }
                else if(ok){
                    var name = ok.name;
                    Classify.update({id:id},{location:name}).exec(function (ko, ok){
                        if(ko){
                            res.serverError(ko);
                        }else if(ok){
                            res.ok(ok);
                        }

                    });

                }

            })
        }

    },

    setLabel: function (req, res){

    }
	
};

