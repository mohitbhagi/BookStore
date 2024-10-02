const express = require("express");
const { getBook } = require("../controllers/BookController");
const router = express.Router();

router.route("/")
    .get(getBook)

module.exports = router;