const {
    bodyParser,
    thisAlwaysRunsMiddleware,
    checkFirstMiddleware,
    checkNextMiddleware,
} = require("./middlewares");

const express = require("express");
const app = express();
app.set("view engine", "pug");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");

app.use(bodyParser);
app.use(thisAlwaysRunsMiddleware("/"));
app.use(checkFirstMiddleware("/hello"));
app.use(checkNextMiddleware);
app.use(express.static(path.join(__dirname, "public")));
app.use(shopRoutes);
app.use("/admin", adminData.routes);

app.use((req, res, next) => {
    res.status(404).render("404", { errorTitle: "Page Not Found" });
});
app.listen(3000);
