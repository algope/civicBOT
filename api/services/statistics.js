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
        Label.findOne({label: cat}).exec(function(ko, label){
            if(ko){
                sails.log.error("DB: Error looking for a label");
            }else if(label){
                Classify.count({label: label.id}).exec(function (error, sum) {
                    if (error){
                        sails.log.error("DB: Error generating statistics -> ", error);
                    }
                    resolve(sum);

                })

            }

        })


    });
};
