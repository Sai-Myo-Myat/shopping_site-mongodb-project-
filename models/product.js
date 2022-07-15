const path  = require("path")
const fs = require("fs");
const CartModel = require('./cart')
const mongo = require('../Util/database').getDb;
const dir = require.main.path;

const p = path.join(dir, "data", "products.json");

const getProductDataFromFile = (callBackFun) => {

  fs.readFile(p,(err,fileContent) => {
    if(err) {
       callBackFun([])
    }else {
       callBackFun(JSON.parse(fileContent))
    }
  })
} 

module.exports = class ProductModel {
  constructor(id,title,imageUrl,price,description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl
    this.price = price;
    this.description = description;
  }

  save(){
    
    getProductDataFromFile(products => {
      if(this.id) {
        const exitingProductIndex = products.findIndex(product => product.id === this.id)
        const allproducts = [...products];
        allproducts[exitingProductIndex] = this;
        fs.writeFile(p,JSON.stringify(allproducts),(err) => {
          console.log(err);
        })
      }else {
        this.id = Math.random().toString();
        products.push(this)
        fs.writeFile(p,JSON.stringify(products), err => {
          console.log("error from writing ",p, "file's content -", err)
        })
      }
     
    })
  }

  static fetchProducts(callBackFun){
    getProductDataFromFile(callBackFun);
  }

  static fetchOneProduct(id,callBackFun) {
    getProductDataFromFile(products => {
      const product = products.find(product => product.id === id);
      callBackFun(product);
    })
  }

  static deleteProduct(id) {
   getProductDataFromFile(products => {
    const productToDelete = products.find(product=> product.id === id)
    const productsAfterDeleting = products.filter(product => {
      return product.id !== id
    });
    fs.writeFile(p,JSON.stringify(productsAfterDeleting), err => {
      if(!err) { 
        CartModel.deleteCart(id,productToDelete.price);
      }
    })  
   })
  }
}