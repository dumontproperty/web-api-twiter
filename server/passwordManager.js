var crypt = require("crypto");

module.exports.cryptPassword = function (password, callback) {
    if (!password)
        return callback(true, null);
    var sum = crypt.createHash("sha1");
    sum.update(password);
    return callback(false, sum.digest("hex"));
};


module.exports.cryptPasswordSync = function (password) {
    if (!password)
        return null;

    var sum = crypt.createHash("sha1");
    sum.update(password);

    return sum.digest("hex");
};
