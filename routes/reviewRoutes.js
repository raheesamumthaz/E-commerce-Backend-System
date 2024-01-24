const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedparser = bodyParser.urlencoded({extended: true});

const reviewController = require('../controllers/reviewController');
/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a new review to a product
 *     tags: ['Reviews']
 *     parameters:
 *       - in: body
 *         name: review
 *         description: The review to add
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             productId:
 *               type: string
 *             userId:
 *               type: string
 *             rating:
 *               type: number
 *             comment:
 *               type: string
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/reviews", urlencodedparser, reviewController.addReview);

/**
 * @swagger
 * reviews/{productId}:
 *   get:
 *     summary: Get reviews for a product
 *     tags: ['Reviews']
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Product not found or no reviews found
 */
router.get("/reviews/:productId",  urlencodedparser, reviewController.getReviews);

module.exports = router;