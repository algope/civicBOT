/**
 * Statistics Services
 *
 * @description :: Server-side logic for generating statistics
 * @author      :: Alejandro González - algope@github
 * @licence     :: The MIT License (MIT)
 *
 */

module.exports.getStatistics = function(cat){
    var sum=0;
    sails.log.debug("GETTING STATISTICS>>>CAS>>>>>>>>");

    return new Promise(function (resolve, reject) {
        PhotoLabel.count({label: cat}).exec(function (error, countPhoto) {
            if (countPhoto){
                sails.log.debug("Count PHOTO >>>>");
                sum = sum + countPhoto;
            }
            else if(error){
                sails.log.error("ERROR COUNT DB STATISTICS: ",error);
            }


        }).then(
            TextLabel.count({label: cat}).exec(function (error, countText) {
                if (countText) {
                    sails.log.debug("Count TEXT >>>>");
                    sum = sum + countText;
                    resolve(sum);
                }else if(error){
                    sails.log.error("ERROR COUNT DB STATISTICS: ",error);
                }


            })

        );
        resolve(sum);
    });
};
