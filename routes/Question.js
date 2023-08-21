// Import the required modules
const express = require("express")
const router = express.Router()

const {auth} =  require("../middleware/Auth");



const{
    createquestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestion,
    upVote,
    downVote,
    comments
} = require("../controllers/Question")


router.post("/createquestion",auth,createquestion);
router.put("/updateQuestion",auth,updateQuestion);
router.delete("/deleteQuestion",auth,deleteQuestion);
router.get("/getAllQuestion",auth,getAllQuestion);
router.put("/upVote",auth,upVote);
router.put("/downVote",auth,downVote);
router.put("/comments",auth,comments);


// Export the router for use in the main application
module.exports = router