const { Router } = require('express');
const router = Router();

const JobPositionController = require('../controllers/JobPosition');
const { Authentication } = require('../middlewares/auth');

router.get('/', Authentication, JobPositionController.getJobPosition);
router.get('/detail/:id', Authentication, JobPositionController.getDetailJobPosition);
router.get('/pagination', Authentication, JobPositionController.getJobPositionPage);
router.get('/description', Authentication, JobPositionController.getJobPositionByDescription);
router.get('/location', Authentication, JobPositionController.getJobPositionByLocation);
router.get('/title', Authentication, JobPositionController.getJobPositionByTitle);

module.exports = router;
