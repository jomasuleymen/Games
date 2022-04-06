const router = require('express').Router();
const sudokuController = require('../controllers/sudoku');

router.get('/generate', sudokuController.generate);

module.exports = router;