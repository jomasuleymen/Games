const axios = require("axios");

const difficulties = ["easy", "medium", "hard"];

function generateSudoku(req, res, difficulty) {
    if (!difficulties.includes(difficulty))
        res.status(404).json({ message: "Not such difficulty" });
    axios
        .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
        .then((response) => {
            res.json(response.data.board);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json("error");
        });
}

module.exports =  { generateSudoku };
