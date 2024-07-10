const express = require('express');
const { userController } = require('../../controllers')

const router = express.Router();



router.get('/search', userController.searchUser);

router.get('/:username', userController.getUsername);

router.get('/:username/friends', userController.getFriends)

router.delete('/:username', userController.deleteUser);

router.patch('/:username', userController.updateData);

router.get('/', userController.sortUsers);

module.exports = router