module.exports.thisAlwaysRunMiddleware = (path) => {
    return (req, res, next) => {
        console.log("this always run");
        console.log(`Request URL: ${req.url} Method: ${req.method}`);
        next();
    };
};

module.exports.checkFirstMiddleware = (path) => {
    return (req, res, next) => {
        if (req.path !== path) {
            console.log("No! wrong middleware");
            next();
        } else {
            res.send("<h2>Middleware Init. Stop here</h2>");
        }
    };
};

module.exports.checkNextMiddleware = (req, res, next) => {
    console.log("Second Middleware.");
    next();
};
