const mongoose = require('mongoose');
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const sudokuRouter = require("./routes/sudokuRouter");
const authRouter = require('./routes/auth');

const app = express();

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

/* Routes */
app.use("/sudoku", sudokuRouter);
app.use("/auth", authRouter);

/* not found response */
app.use((req, res) => {
    res.send("No found url");
});

/* run server if db connected successfull */
mongoose
    .connect("mongodb://localhost/games")
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            const date = new Date();
            console.log(date.getHours() + ":" + date.getMinutes());
        });
    })
    .catch((err) => {
        console.log(err);
    });
