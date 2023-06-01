const bodyParser = require("body-parser");
module.exports.bodyParser = bodyParser.urlencoded({ extended: false });

module.exports.thisAlwaysRunsMiddleware = (path) => {
    return (req, res, next) => {
        next();
    };
};

module.exports.checkFirstMiddleware = (path) => {
    return (req, res, next) => {
        if (req.path !== path) {
            next();
        } else {
            res.send("<h2>Middleware Init. Stop here</h2>");
        }
    };
};

module.exports.checkNextMiddleware = (req, res, next) => {
    next();
};
