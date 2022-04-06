const data = [
    [0, 9, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 4, 6, 8, 0, 7, 0],
    [4, 0, 0, 0, 7, 9, 0, 0, 6],
    [0, 1, 0, 3, 0, 6, 0, 0, 0],
    [0, 0, 0, 8, 9, 0, 0, 1, 0],
    [0, 0, 9, 1, 0, 0, 3, 6, 0],
    [5, 0, 0, 0, 0, 0, 0, 0, 1],
    [8, 7, 1, 0, 0, 5, 0, 2, 4],
    [9, 4, 2, 6, 8, 1, 7, 5, 3],
];

// `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`

const generate = (req, res) => {
    const difficulty = req.query.difficulty;
    if (!difficulty) {
        res.json(data);
    }else{
        res.json(data);
    }
};

module.exports = {
    generate,
};
