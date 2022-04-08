const mongoose = require("mongoose");

const sudokuSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    easy: {
        min: {
            type: Number,
            default: null,
        },
        average: {
            type: Number,
            default: null,
        },
        allTime: {
            type: Number,
            default: 0,
        },
        played: {
            type: Number,
            default: 0,
        },
    },
    medium: {
        min: {
            type: Number,
            default: 999999,
        },
        average: {
            type: Number,
            default: 999999,
        },
        allTime: {
            type: Number,
            default: 0,
        },
        played: {
            type: Number,
            default: 0,
        },
    },
    hard: {
        min: {
            type: Number,
            default: 999999,
        },
        average: {
            type: Number,
            default: 999999,
        },
        allTime: {
            type: Number,
            default: 0,
        },
        played: {
            type: Number,
            default: 0,
        },
    },
});

module.exports = mongoose.model("sudoku", sudokuSchema);
