const ProductModel = require('../models/product')
const CartModel = require('../models/cart')

exports.getIndexPage = (req, res, next) => {
  ProductModel.fetchProducts()
  .then(products => {
    res.render("shop/index", {
      products: products,
      pageTitle: "Home",
      path: "/",
    })
  })
  .catch(err => console.log(err))
}

exports.getAllProducts = (req, res, next) => {
  ProductModel.fetchProducts()
  .then(products => {
    res.render("shop/product_list", {
      products: products,
      pageTitle: "All Products",
      path: "/products",
    })
  })
  .catch(err => console.log(err))
}

exports.getCartPage = (req,res,next) => {
  CartModel.getCarts(carts => {
    ProductModel.fetchProducts(products => {
      let cartData = [];
      for(product of products){
        let cartFromProducts = carts.products.find(prod => prod.id === product.id);
        if(cartFromProducts){
          cartData.push({productData: product, qty: cartFromProducts.qty})
        }
        console.log(cartData)
        
      }
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        carts: cartData
      })
    })
  })
  
}

exports.deleteCart = (req,res,next) => {
  const productId = req.body.productId;
  // ProductModel.fetchOneProduct(productId, product => {
  //   CartModel.deleteCart(productId,product.price);
  // })
  res.redirect('/cart')
}


exports.getOrdersPage = (req,res,next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders"
  })
}

exports.getCheckoutPage = (req,res,next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  })
}

//get product details
exports.getProductDetails = (req,res,next) => {
  const productId = req.params.productId;
  console.log("id", productId)
  ProductModel.fetchOneProduct(productId)
  .then(product => {
    res.render("shop/product_details",{
      product: product,
      pageTitle: product.title,
      path: "product-details"
    })
  })
  .catch(err => {
    console.log("yes it's right here",err)
  })
}

exports.addToCart = (req,res,next) => {
  const productId = req.body.productId;
  ProductModel.fetchOneProduct(productId, product => {
    const productPrice = product.price;
    CartModel.addToCart(productId,productPrice)
  })
  res.redirect('/')
}
