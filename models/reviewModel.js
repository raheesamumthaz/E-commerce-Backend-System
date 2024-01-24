const mongoose = require('mongoose');

//Connecting to orders database
const dbURI =
  "mongodb+srv://r4raheesamumthaz:admin123@cluster0.ujrapcs.mongodb.net/Reviews?retryWrites=true&w=majority";
const productConn = mongoose.createConnection(dbURI);
const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: [true, "Please enter the productId"] },
  userId: { type: String, required: [true, "Please enter the UserId"] },
  rating: { type: Number, required: [true, "Please add a rating"], 
  min: 1,
  max: 5,
  validate: {
    validator: Number.isInteger,
    message: '{VALUE} is not an integer value for rating.',
  },},
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('review', reviewSchema);