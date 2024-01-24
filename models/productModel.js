const mongoose = require("mongoose");


//Connecting to Products database
const dbURI =
  "mongodb+srv://r4raheesamumthaz:admin123@cluster0.ujrapcs.mongodb.net/Products?retryWrites=true&w=majority";;
const productConn = mongoose.createConnection(dbURI);

const productSchema = new mongoose.Schema({

  
    name: {
      type: String,
      lowercase: true,
      required: [true, "Please enter the product name"],
    },
    description: {
      type: String,
      lowercase: true,
      required: [true, "Please enter the description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter the price"],
    },
    category: {
        type: String,
        lowercase: true,
        required: [true, "Please enter the category"],
      }
  })
  


  module.exports = productConn.model("product", productSchema);

