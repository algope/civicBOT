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
        Classify.count({label: cat}).exec(function (error, sum) {
            if (sum){
                resolve(sum);
            }
            else if(error){
                sails.log.error("DB: Error generating statistics -> ", error);
            }
        })

    });
};
