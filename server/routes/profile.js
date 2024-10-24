const router = require('express').Router();
const controller = require('../controllers/profile');

router.get('/', controller.getProfiles);

module.exports = router;
