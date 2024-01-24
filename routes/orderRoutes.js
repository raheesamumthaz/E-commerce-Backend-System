const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedparser = bodyParser.urlencoded({extended: true});

const orderController = require('../controllers/orderController');


/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: ['Orders']
 *     parameters:
 *       - in: body
 *         name: New Order
 *         description: New order request
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             products:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   quantity:
 *                     type: number
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid request body
 */
router.post('/orders', urlencodedparser, orderController.placeOrder);


/**
 * @swagger
 * /orders/{userId}:
 *   get:
 *     summary: Get user's order history
 *     tags: ['Orders']
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: User not found or no orders found
 */
router.get('/orders/:userId', urlencodedparser, orderController.getHistory);


/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order status
 *     tags: ['Orders']
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: order
 *         description: The updated order details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid request body
 */
router.put('/orders/:id', urlencodedparser, orderController.updateOrder);
module.exports = router;