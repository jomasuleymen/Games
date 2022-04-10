const Sudoku = require("../models/sudoku");
const axios = require("axios");

const generate = (req, res) => {
    const difficulty = req.query.difficulty;
    axios
        .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
        .then(({ data }) => {
            const { board } = data;
            res.json(board);
        })
        .catch(() => {
            res.status(400).json({ message: "Some error occured" });
        });
};

const record = async (req, res) => {
    const { spentTime, difficulty } = req.body;
    let record = await Sudoku.findOne({ user: req.user });
    if (!record) {
        record = await Sudoku.create({
            user: req.user,
        });
    }
    const recordData = record[difficulty];
    recordData.min = Math.min(recordData.min, spentTime);
    recordData.played += 1;
    recordData.allTime += spentTime;
    recordData.average = recordData.allTime / recordData.played;
    await record.save();
    res.json({
        min: recordData.min,
        played: recordData.played,
        average: recordData.average,
    });
};

const getRecord = async (req, res) => {
    let record = await Sudoku.findOne({ user: req.user });
    if (!record) {
        res.json(null);
        return;
    }
    res.json({
        easy: record.easy,
        medium: record.medium,
        hard: record.hard,
    });
};

module.exports = {
    generate,
    record,
    getRecord,
};
