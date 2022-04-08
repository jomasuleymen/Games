const Sudoku = require("../models/sudoku");

const data = [
    [0, 9, 7, 5, 1, 3, 2, 4, 8],
    [1, 2, 3, 4, 6, 8, 5, 7, 9],
    [4, 5, 8, 2, 7, 9, 1, 3, 6],
    [2, 1, 4, 3, 5, 6, 8, 9, 7],
    [3, 6, 5, 8, 9, 7, 4, 1, 2],
    [7, 8, 9, 1, 2, 4, 3, 6, 5],
    [5, 3, 6, 7, 4, 2, 9, 8, 1],
    [8, 7, 1, 9, 3, 5, 6, 2, 4],
    [9, 4, 2, 6, 8, 1, 7, 5, 3],
];

// `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`

const generate = (req, res) => {
    const difficulty = req.query.difficulty;
    if (!difficulty) {
        res.json(data);
    } else {
        res.json(data);
    }
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
    if (!record){
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
