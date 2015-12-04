module.exports.findOrCreateEntry = function (find, create) {
    return new Promise(function (resolve, reject) {
        UserStages.findOrCreate(find, create, function (err, data) {
            if (err) {
                reject(err)
            }
            if (data) {
                resolve(data)
            }
        })
    })
};

module.exports.updateStage = function (find, update) {
    return new Promise(function (resolve, reject) {
        UserStages.update(find, update, function (err, data) {
            if (err) {
                reject(err)
            }
            if (data) {
                resolve(data)
            }
        })
    })
};
