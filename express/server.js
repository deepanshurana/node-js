const {
    bodyParser,
    thisAlwaysRunsMiddleware,
    checkFirstMiddleware,
    checkNextMiddleware,
} = require("./middlewares");

const express = require("express");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { stat } = require("fs");
const path = require("path");

app.use(bodyParser);
app.use(thisAlwaysRunsMiddleware("/"));
app.use(checkFirstMiddleware("/hello"));
app.use(checkNextMiddleware);

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.listen(3000);
