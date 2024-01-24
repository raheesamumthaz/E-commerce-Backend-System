const mongoose = require('mongoose');
//Connecting to orders database
const dbURI =
  "mongodb+srv://r4raheesamumthaz:admin123@cluster0.ujrapcs.mongodb.net/Orders?retryWrites=true&w=majority";
const productConn = mongoose.createConnection(dbURI);

const orderSchema = new mongoose.Schema({
  userId: { type: String, required:  [true, "Please enter the user Id"] },
  products: [{ productId: String, quantity: Number }],
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('order', orderSchema);