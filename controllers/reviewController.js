const review = require('../models/reviewModel');

//handle errors
const handleErrors = (err) => {
    let error = {};

    if (err.message.includes('review validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        })
    }
    return error;
}
//add a new review
module.exports.addReview = async function (req, res) {
    const { productId, userId, rating, comment } = req.body;
    const newReview = new review({
        productId,
        userId,
        rating,
        comment,
      });
    try {
        const result = await newReview.save();
        
        res.status(200).json(result);
      
    } catch (error) {
      const errors = handleErrors(error);
      return res.status(400).json({errors});
    }
    
};


//Get review by productid
module.exports.getReviews = async function(req,res){
    
    const productId = req.params.productId;
    try {
        const productReviews = await review.find({ productId });
        if (productReviews.length === 0) {
          return res.status(404).json({ message: 'Product not found or no reviews found' });
        }
        res.status(200).json(productReviews);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };