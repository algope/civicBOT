/**
 * Statistics Services
 *
 * @description :: Server-side logic for generating statistics
 * @author      :: Alejandro González - algope@github
 * @licence     :: The MIT License (MIT)
 *
 */

module.exports.getStatistics = function(cat){

    sails.log.debug("GETTING STATISTICS>>>cAT>>>>>>>>",cat);
    return new Promise(function (resolve, reject) {
        var sum=0;
        PhotoLabel.count({label: cat}).exec(function (error, countPhoto) {
            if (countPhoto){
                sails.log.debug("Photo FOUND >>>>");
                sum = sum + countPhoto;
                TextLabel.count({label: cat}).exec(function (error, countText) {
                    if (countText) {
                        sails.log.debug("Text FOUND, resolving >>>>");
                        sum = sum + countText;
                        resolve(sum);
                    }else if(error){
                        sails.log.error("ERROR COUNT DB STATISTICS: ",error);
                    }else if(!countText){
                        sails.log.debug("NO COUNT TEXT, resolving");
                        resolve(sum);
                    }

                })
            }
            else if(error){
                sails.log.error("ERROR COUNT DB STATISTICS: ",error);
            }else if(!countPhoto){
                sails.log.debug("No photo found, trying with text");
                TextLabel.count({label: cat}).exec(function (error, countText) {
                    if (countText) {
                        sails.log.debug("Text found, resolving >>>>");
                        sum = sum + countText;
                        resolve(sum);
                    }else if(error){
                        sails.log.error("ERROR COUNT DB STATISTICS: ",error);
                    }else if(!countText){
                        sails.log.debug("No text nor photo found, resolving");
                        resolve(0);
                    }

                })
            }
        })

    });
};
