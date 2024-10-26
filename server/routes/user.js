const router = require('express').Router();
const controller = require('../controllers/user');
const profileController = require('../controllers/profile');
const chatController = require('../controllers/chat');

router.get('/:userId', controller.getUser);
router.put('/:userId', controller.putUser);
router.get('/:userId/friends', controller.getUserFriends);
router.get('/:userId/profile', profileController.getProfile);
router.put('/:userId/profile', profileController.putProfile);
router.get('/:userId/chats', chatController.getChats);

module.exports = router;
