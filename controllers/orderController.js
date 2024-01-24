const order= require('../models/orderModel');

//handle errors
const handleErrors = (err) => {
    let error = {};

    if (err.message.includes('order validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        })
    }
    return error;
}

//Place a new order
module.exports.placeOrder= async function (req, res) {

    const { userId, products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'Invalid request body,please provide the product details' });
      }
    
      const newOrder = new order({
        userId,
        products,
        status: 'Pending', // Default status
      });
      try {
        const newOrderResp= await newOrder.save();
        res.status(200).json(newOrderResp);
      } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
      }
    
};


//Get order history by userid
module.exports.getHistory = async function(req,res){
    
  const userId = req.params.userId;
  try {
    const userOrders = await order.find({ userId });
    if (userOrders.length === 0) {
      return res.status(404).json({ message: 'User not found or no orders found' });
    }
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update a order details
module.exports.updateOrder= async function (req, res) {
  if (!req.body.status) {
    return res.status(400).json({ message: 'Invalid request body' });
  }
  
  try {
    orderDetails = await order.findById(req.params.id);
    if (!orderDetails) {
      return res.status(404).json({ message: 'Order not found' });
    }
    else{
    orderDetails.status = req.body.status;
    const updatedOrder = await orderDetails.save();
    res.status(200).json(updatedOrder);
    }
      
    } catch (error) {
      return res.status(400).json({error});
    }
};