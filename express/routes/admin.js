const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");
const router = express.Router();
const products = [];

function transformSentence(sentence) {
    let words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] =
            words[i].charAt(0).toUpperCase() + words[i].substr(1).toLowerCase();
    }
    return words.join(" ");
}
router.get("/add-product", (req, res) => {
    res.render("add-product", { pageTitle: "Add Products" });
});

router.post("/product", (req, res) => {
    filteredTitle = transformSentence(req.body.title);
    products.push({ title: filteredTitle });
    res.redirect("/");
});

exports.routes = router;
exports.products = products;
