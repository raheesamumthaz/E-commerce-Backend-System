const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const bodyParser = require("body-parser");
const urlencodedparser = bodyParser.urlencoded({extended: true});



/**
 * @swagger
 * /products:
 *  get:
 *    tags: ['Products']
 *    summary: Get list of products
 *    responses:
 *      '200':
 *        description: list of all products
 *      '400' :
 *        description: Error occured
 */

router.get('/products' , productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    tags: ['Products']
 *    summary: Get details of a single product
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *    responses:
 *      '200':
 *        description: details of a single product
 *      '400' :
 *        description: Error occured
 *      '404':
 *         description: Product not found
 */

router.get('/products/:id' , productController.getProductbyId);



/**
* @swagger
* paths:
*  /products:
*    post:
*      tags: ['Products']
*      summary: add a new prodcut
*      parameters:
*           - in: body
*             name: New Product
*             description: The product to add
*             required: true
*             schema:
*               type: object
*               properties:
*                 name:
*                   type: string
*                 description:
*                   type: string
*                 price:
*                   type: number
*                 category:
*                   type: string
*      responses:
*        '200':
*          description: Product added successfully
*        '400':
*          description: Error occured        
*/
router.post('/products', urlencodedparser, productController.addProduct);




/**
* @swagger
* paths:
*   /products/{id}:
*    put:
*      tags: ['Products']
*      summary: update a  product
*      parameters:
*         - in: path
*           name: id
*           type: string
*           required: true
*           description: Object Id of the product to update.
*         - in: body
*           name: Updated Data
*           type: string
*           required: true
*           description: data to update for product.
*           schema:
*               type: object
*               properties:
*                 name:
*                   type: string
*                 price:
*                   type: number
*      responses:
*        '200':
*          description: upated product details
*        '400':
*          description: Error occured        
*/

router.put("/products/:id",  urlencodedparser, productController.updateProduct);


/**
* @swagger
* paths:
*   /products/{id}:
*     delete:
*       summary: Delete a product
*       tags: ['Products']
*       parameters:
*         - in: path
*           name: id
*           type: string
*           required: true
*           example: 613b038a7200c95d5c3a35bc
*           description: Object Id of the product to delete. 
*       responses:
*         '201':
*           description: deleted product details
*         '400' :
*           description: Error occured     
*/


router.delete("/products/:id", productController.deleteProduct);

module.exports = router;