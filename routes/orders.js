const router = require('express').Router();
const ordersController = require('../controllers/ordersControllers');
const {verifyToken} = require('../middleware/verifyToken'); 

router.get('/', verifyToken, ordersController.getUserData)

module.exports = router;