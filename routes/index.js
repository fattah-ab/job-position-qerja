const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.json("Welcome to MPro job position qerja API");
});


const userRoutes = require('./user');
router.use('/user', userRoutes);

const jobPositionRoutes = require('./jobPosition');
router.use('/jobPosition', jobPositionRoutes);

module.exports = router;