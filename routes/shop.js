const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController")

router.get("/", shopController.getIndexPage);

router.get("/products", shopController.getAllProducts);

router.get("/cart", shopController.getCartPage)

router.post("/delete-cart", shopController.deleteCart)

router.get("/orders", shopController.getOrdersPage)

router.get("/checkout", shopController.getCheckoutPage)

router.get("/products/:productId", shopController.getProductDetails)

//actions
router.post("/add-to-cart", shopController.addToCart)



module.exports = router;

