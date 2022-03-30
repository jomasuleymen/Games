const router = require('express').Router();
const { register } = require('../controllers/userController');

router.post('/', async (req, res) => {
    try {
        const data = await register(req.body);
        res.json({'message': 'created', data})
    } catch (err) {
        res.status(400).json({ 'error': err.message });
    }
});

module.exports = router;