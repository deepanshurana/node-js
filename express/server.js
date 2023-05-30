const {
    bodyParser,
    thisAlwaysRunMiddleware,
    checkFirstMiddleware,
    checkNextMiddleware,
    addProduct,
    allProducts,
} = require("./middlewares");

const express = require("express");
const app = express();

app.use(bodyParser);
app.use(addProduct("/add-product"));
app.use(allProducts("/product"));
app.use(thisAlwaysRunMiddleware("/"));
app.use(checkFirstMiddleware("/hello"));
app.use(checkNextMiddleware);

app.get("/", (req, res) => {
    res.send("Bypassed all the checks");
});

app.listen(3000);
