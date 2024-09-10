//import express
const express = require('express')

//import userController file
const userController = require('./controller/userController')

//import reviewController file
const reviewController = require('./controller/reviewController')
//middleware
const jwt = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware');
const multer = require('multer');

//creating an object for router class
const router = new express.Router()

//set up path for each request from view

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//addReview
router.post('/addreview',jwt,multerConfig.single('movimg'),reviewController.addReviewController)

//allReviews
router.get('/allReview',reviewController.getAllReviewController)

//homeReviews
router.get('/homeReview',reviewController.homeReviewController)

//userReview
router.get('/userReview',jwt,reviewController.userReviewController)

//Delete
router.delete('/deleteReview/:id',reviewController.deleteReviewController)


//edit project
router.put('/edit-review/:id',jwt,multerConfig.single('movimg'),reviewController.editReviewController)

//export the router
module.exports = router