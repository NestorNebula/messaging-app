const router = require('express').Router();
const controller = require('../controllers/message');

router.put('/:messageId', controller.putMessage);
router.delete('/:messageId', controller.deleteMessage);

module.exports = router;
