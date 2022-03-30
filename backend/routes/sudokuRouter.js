const router = require('express').Router();
const { generateSudoku } = require('../controllers/sudokuController');

router.get('/:difficulty/', function (req, res) {
    generateSudoku(req, res, req.params.difficulty);
})

router.use((req, res) => {
    res.send("No found sudoku url");
  });

module.exports = router;