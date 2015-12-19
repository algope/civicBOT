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

    return new Promise(function (resolve, reject) {
        PhotoLabel.count({label: cat}).exec(function (error, countPhoto) {
            sum = sum + countPhoto;

        }).then(
            TextLabel.count({label: cat}).exec(function (error, countText) {
                sum = sum + countText;
                resolve(sum);

            })
        );
    });
};
