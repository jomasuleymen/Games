const router = require('express').Router();
const sudokuController = require('../controllers/sudoku');
const userDetermine = require('../middleware/user');

router.get('/generate', sudokuController.generate);
router.put('/record', userDetermine, sudokuController.record);
router.get('/record', userDetermine, sudokuController.getRecord);

module.exports = router;