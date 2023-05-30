const bodyParser = require("body-parser");
module.exports.bodyParser = bodyParser.urlencoded({ extended: false });

module.exports.thisAlwaysRunMiddleware = (path) => {
    return (req, res, next) => {
        console.log("this always run");
        console.log(`Request URL: ${req.url} Method: ${req.method}`);
        next();
    };
};

module.exports.addProduct = (path) => {
    return (req, res, next) => {
        let html_body = "";
        if (req.path === path) {
            html_body = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <form action="/product" method="POST">
                    <input type="text" name="title">
                        <button type="submit"> Add product</button>
                </form>
            </body>
            </html>`;

            res.send(html_body);
        } else {
            next();
        }
    };
};

module.exports.allProducts = (path) => {
    return (req, res, next) => {
        if (req.path === path) {
            console.log(req.body);
            res.redirect("/");
        } else {
            next();
        }
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
