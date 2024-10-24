const router = require('express').Router();
const controller = require('../controllers/chat');
const messageController = require('../controllers/message');

router.post('/', controller.postChat);
router.put('/:chatId', controller.putChat);
router.post('/:chatId/messages', messageController.postMessage);

module.exports = router;
