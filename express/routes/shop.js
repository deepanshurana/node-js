const express = require("express");
const path = require("path");
const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res, next) => {
    const products = adminData.products;
    console.log(adminData.products);
    res.render("shop", { prods: products, docTitle: "Shop" });
});

module.exports = router;
