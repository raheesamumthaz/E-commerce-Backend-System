const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//routes
const productRoutes= require('./routes/productRoutes');
const orderRoutes= require('./routes/orderRoutes');
//Connect to Customers Database
const dbURI =
  "mongodb+srv://r4raheesamumthaz:admin123@cluster0.ujrapcs.mongodb.net/ecommerce?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    connectTimeoutMS: 5000,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

app.use('/',[productRoutes,orderRoutes]);
app.listen(4000, () => console.log(`Listening on: 4000`));