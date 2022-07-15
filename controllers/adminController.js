const ProductModel = require('../models/product')

exports.getForm =(req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
}

exports.getEditForm =(req, res, next) => {
  const editMood = req.query.edit;
  if(!editMood){
    return res.redirect('/');
  }
  const productId = req.params.productId;
  ProductModel.fetchOneProduct(productId, product => {
    if(!product){
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Porduct",
      path: "/admin/edit-product",
      editing: editMood,
      product: product
    })

  });
}

exports.getAdminProducts = (req,res,next) => {
  ProductModel.fetchProducts((products) => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    })
  })
}

exports.addProduct =  (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const products = new ProductModel(null,title,imageUrl,price,description);
  products.save()
  res.redirect("/");
}

exports.editProduct = (req,res,next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const products = new ProductModel(productId,title,imageUrl,price,description) 
  products.save();
  res.redirect("/admin/products")
}

exports.deleteProduct = (req,res,next) => {
  const productId = req.body.productId;
  ProductModel.deleteProduct(productId);
  res.redirect('/admin/products')
}