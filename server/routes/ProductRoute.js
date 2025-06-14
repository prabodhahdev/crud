const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getProducts);
router.route('/create').post(protect, createProduct);
router.route('/edit/:id').put(protect, updateProduct);
router.route('/delete/:id').delete(protect, deleteProduct);


module.exports = router;
