const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")

router.get("/add-product",adminController.getForm);

router.get("/edit-product/:productId", adminController.getEditForm)

router.post("/add-product",adminController.addProduct);

router.post("/edit-product",adminController.editProduct);

router.post('/delete-product',adminController.deleteProduct)

router.get("/products", adminController.getAdminProducts)

module.exports.productRouter = router;
