/**
 * Statistics Services
 *
 * @description :: Server-side logic for generating statistics
 * @author      :: Alejandro González - algope@github
 * @licence     :: The MIT License (MIT)
 *
 */

module.exports.getStatistics = function(cat){

    return new Promise(function (resolve, reject) {
        var sum=0;
        PhotoLabel.count({label: cat}).exec(function (error, countPhoto) {
            if (countPhoto){
                sum = sum + countPhoto;
                TextLabel.count({label: cat}).exec(function (error, countText) {
                    if (countText) {
                        sum = sum + countText;
                        resolve(sum);
                    }else if(error){
                        sails.log.error("ERROR COUNT DB STATISTICS: ",error);
                    }else if(!countText){
                        resolve(sum);
                    }

                })
            }
            else if(error){
            }else if(!countPhoto){
                TextLabel.count({label: cat}).exec(function (error, countText) {
                    if (countText) {
                        sum = sum + countText;
                        resolve(sum);
                    }else if(error){
                        sails.log.error("ERROR COUNT DB STATISTICS: ",error);
                    }else if(!countText){
                        resolve(0);
                    }

                })
            }
        })

    });
};
