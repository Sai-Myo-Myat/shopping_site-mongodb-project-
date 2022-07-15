const mongo = require('./Util/database');

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars");

const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");
const rootDir = require("./Util/path");
const errorController = require("./controllers/errorController") 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

// app.engine(
//   "hbs",
//   expressHbs.engine({
//     layoutsDir: "views/layout",
//     defaultLayout: "layout.hbs",
//   })
// );

app.set("view engine", "ejs");
app.set("views", "views");

app.use(shopRouter);
app.use("/admin", adminData.productRouter);

app.use(errorController.serve404Page);

const PORT = 3000;
// , () => {
//   console.log("server is running on port", PORT);
//   }

mongo.mongoConnect(() => {
  app.listen(PORT, () => {
    console.log("server is running on port", PORT);
  });
  console.log("hehe")
})