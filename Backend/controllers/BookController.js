const Book = require("../models/Book");
const WrapAsync = require("../middlewares/WrapAsync");

module.exports.getBook = WrapAsync(async(req, res) => {
    const book = await Book.find();
    res.status(200).json(book);
});