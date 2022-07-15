const path  = require("path")
const fs = require("fs");

const dir = require.main.path;
// console.log("dir", require.main)

const p = path.join(dir, "data", "cart.json");

module.exports = class CartModel {
 // {products: [], totlalPrice: 0} 

  static addToCart = (id, productPrice) => {
    let cart = {products: [], totalPrice: 0}
    fs.readFile(p,(err,fileContent) => {
      if(!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIdex = cart.products.findIndex(product => product.id === id);
      const existingProduct = cart.products[existingProductIdex];
      let addedProduct;
      if(existingProduct){
        addedProduct = {...existingProduct};  
        addedProduct.qty = addedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIdex] = addedProduct;
      }else {
        addedProduct = {id: id, qty: 1}
        cart.products = [...cart.products, addedProduct];
      }
    
      cart.totalPrice  = Number(cart.totalPrice) +  Number(productPrice);

      fs.writeFile(p,JSON.stringify(cart),err => console.log(err))
    })
  }

  static deleteCart = (id,productPrice) => {
    fs.readFile(p, (err, fileContent) => {
      if(err) {
        return;
      }
      const cartData  = {...JSON.parse(fileContent)};
      const cartToDelete = cartData.products.find(product => product.id === id);
      if(!cartToDelete){
        return
      }
      const productQty = cartToDelete.qty;
      cartData.products = cartData.products.filter(product => product.id !== id);
      cartData.totalPrice = Number(cartData.totalPrice) - Number(productQty) * Number(productPrice);
      fs.writeFile(p,JSON.stringify(cartData),err => {
        console.log("cart data",err)
      })
    })
  }

  static getCarts = (callbackFun) => {
    fs.readFile(p,(err,fileContent) => {
      if(err) {
        callbackFun([])
      }else{
        callbackFun(JSON.parse(fileContent))
      }
    })
  }
}