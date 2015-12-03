




module.exports.findOrCreate = function (find, create) {
    return new Promise(function (resolve, reject) {
        UserStages.findOrCreate(find, create, function (err, data) {
            if (err) {
                reject(err)
            }
            if (newUpdate) {
               resolve(data)
            }
        });
    })
};
