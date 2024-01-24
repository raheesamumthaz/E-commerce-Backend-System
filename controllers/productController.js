const product = require('../models/productModel');
//Get all products

//handle errors
const handleErrors = (err) => {
    let error = {};

    if (err.message.includes('product validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        })
    }
    return error;
}
module.exports.getProducts = async function(req,res){
    
    try {
        const products = await product.find();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};


//Get product by id
module.exports.getProductbyId = async function(req,res){
    
    let productDetails;
    try {
        productDetails = await product.findById(req.params.id);
      if (productDetails == null) {
        return res.status(404).json({ message: 'Product not found' });
      }
      else{
        return res.status(200).json({productDetails});
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

//add a new product
module.exports.addProduct = async function (req, res) {

    const newProduct = req.body;
    try {
      result = await product.create(newProduct);
      res.status(200).json(result);
      
    } catch (err) {
      const error = handleErrors(err);
      return res.status(500).json({error});
    }
    
};

//update a product details
module.exports.updateProduct= async function (req, res) {
    const id = req.params.id;
    const updatedProduct = req.body;
    try {
        result = await product.findByIdAndUpdate(id, updatedProduct, { new: true })
        res.status(200).json(result);
        
      } catch (err) {
        return res.status(500).json({err});
      }
  };

  //Delete a product

  module.exports.deleteProduct = async function (req, res) {

    const id = req.params.id;
    try {
      result = await product.findByIdAndDelete(id);
      res.status(200).json(result);
      
    } catch (err) {
      return res.status(500).json({err});
    }
    
};
