const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const BookRoute = require("./routes/BookRoute");
const UserRoute = require("./routes/UserRoute");
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use(express.json());

// const PORT = process.env.PORT || 3000;

app.use("/book", BookRoute);
app.use("/user", UserRoute);

main()
    .then(() => {
        console.log("Connected to DB");
    }).catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/BookStore");
}

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(8080, () => {
    console.log("Server is listening to 8080");
});