const {
    thisAlwaysRunMiddleware,
    checkFirstMiddleware,
    checkNextMiddleware,
} = require("./middlewares");
const express = require("express");

const app = express();
app.use(thisAlwaysRunMiddleware("/"));
app.use(checkFirstMiddleware("/hello"));
app.use(checkNextMiddleware);

app.get("/", (req, res) => {
    res.send("Bypassed all the checks");
});

app.listen(3000);
