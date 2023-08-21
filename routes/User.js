// Import the required modules
const express = require("express")
const router = express.Router()


const {
    sendotp,
    signup,
    login 
} = require("../controllers/Auth")


const {auth} =  require("../middleware/Auth");



// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************



// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)



// Export the router for use in the main application
module.exports = router