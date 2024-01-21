const router = require('express').Router();
const productController = require('../controllers/productsControllers');

// Use POST method for creating a product
router.post('/', productController.createProduct);

// Define other GET routes for different functionalities
router.get('/', productController.getAllProduct);
router.get('/:id', productController.getProduct);
router.get('/search/:key', productController.searchProducts);   

module.exports = router;