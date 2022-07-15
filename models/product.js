const path  = require("path")
const fs = require("fs");
const CartModel = require('./cart')

const dir = require.main.path;

//mongoDb
const getDb = require('../Util/database').getDb;
const mongoDb = require('mongodb')

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
  constructor(title,imageUrl,price,description) {
    this.title = title;
    this.imageUrl = imageUrl
    this.price = price;
    this.description = description;
  }

  save(){
    const db = getDb();
    return db.collection('porducts')
    .insertOne(this)
    .then(result => {
      console.log("this is result",result);
    })
    .catch(err => {
      console.log(err)
    })
  }

  static fetchProducts(callBackFun){
    const db = getDb();
    return db.collection("porducts")
    .find() //cursor
    .toArray()
    .then(products=> {
      console.log("products", products)
      return products;
    })
    .catch(err => {
      console.log(err)
    })
  }

  static fetchOneProduct(id) {
    const db = getDb();
    return db.collection("products")
    .find({_id: new mongoDb.ObjectId(id)})
    .next()
    .then(product => {
      console.log("this is product", product)
      return product;
    })
    .catch(err => {
      console.log(err)
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