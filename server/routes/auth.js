const router = require('express').Router();
const controller = require('../controllers/auth');

router.post('/signup', controller.signUp);
router.post('/login', controller.logIn);
router.get('/refresh', controller.refresh);

module.exports = router;
