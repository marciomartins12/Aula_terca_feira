const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const userMiddleware = require("../middleware/userMiddleware");


router.get('/', pageController.pageHan);
router.get('/login', pageController.pageLogin);
router.post('/tryLogin', pageController.tryLogin);
router.get('/register', pageController.pageRegister);
router.post('/registerNewUser', pageController.registerNewUser);
router.get('/logout', pageController.logout);
router.get('/pageHome', userMiddleware, pageController.pageHome);

module.exports = router;