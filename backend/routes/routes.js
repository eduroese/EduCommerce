const express = require ('express');
const productsController = require('../src/products/productsController')
const userController = require('../src/user/userController')
const router = express.Router();

router.route('/products/getAll').get(productsController.getDataControllerfn);

router.route('/products/createProduct').post(productsController.createProductControllerfn);

router.route('/products/updateProduct/:id').patch(productsController.updateProductControllerfn);

router.route('/user/loginUser').post(userController.loginUserControllerfn);

router.route('/user/createUser').post(userController.createUserControllerfn);

module.exports = router;