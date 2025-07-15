const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', userController.createUser);
router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/claim', userController.claimPoints);

module.exports = router;
