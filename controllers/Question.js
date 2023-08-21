require("dotenv").config();
const  User =  require("../models/User");
const  Question  =  require("../models/Question");


exports.createquestion = async (req,res)=>{
    try{
        const {desc} =  req.body;

        const userId  =  req.user.id;
        

        console.log("Printing The userId inside createque",userId);
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"UserId not found",
            })
        }

        const user  =  await User.findOne({_id:userId});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found",
            })
        }

        const savedQuestion =  await Question.create({
            desc,
            createdBy : user._id
        })
        
        await User.findByIdAndUpdate({_id:user._id},
                                     {
                                        $push:{
                                            questions : savedQuestion._id
                                          }
                                     },
                                     {new:true})

        return res.status(200).json({
            success:true,
            message:"Question created Successfully",
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error While creating a question"
        })
    }
}



exports.updateQuestion = async (req,res)=>{
    try{
        const {desc,questionId}  = req.body;

        const userId  =  req.user.id;

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"UserId not found",
            })
        }

        const user  =  await User.findOne({_id:userId});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found",
            })
        }

        const  question  =  await Question.findById({_id:questionId});

        if(!question){
            return res.status(400).json({
                success:false,
                message:"Question not found",
            })
        }

        console.log("question",question)
        await Question.findByIdAndUpdate({_id:questionId},
                                         {
                                             desc:desc
                                         },
                                         {new:true});

        return res.status(200).json({
            success:true,
            message:"Question updated Successfully"
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Errror while Updating Question"
        })
    }
}


exports.deleteQuestion =  async (req,res)=>{
    try{
        const {questionId} =  req.body;

        if(!questionId){
            return res.status(400).json({
                success:false,
                message:"Question id not found"
            })
        }

        const question = await Question.findById({_id:questionId});

        if(!question){
            return res.status(400).json({
                success:false,
                message:"Question Not found",
            })
        }

        await Question.findByIdAndDelete({_id:question._id});

        return res.status(200).json({
            success:true,
            message:"Question Deleted "
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error while deleting question"
        })
    }
}


exports.getAllQuestion  =  async (req,res)=>{
    try{
        const userId  =  req.user.id;
        
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"UserId not Found",
            })
        }

        const  user  =  await User.findById({_id:userId});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        const questionList  = await User.findById({_id:userId}).populate("questions").exec();


        return res.status(200).json({
            success:true,
            message:"User Questions Found SuccessFully",
            questionList
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error while getting All Question"
        })
    }
}


exports.upVote =  async (req,res)=>{
    try{
        const {questionId} = req.body;

        if(!questionId){
            return  res.status(400).json({
                success:false,
                message:"questionId not found",
            })
        }

        const question = await Question.findById({_id:questionId});

        console.log("Printing Que",question)
        if(!question){
            return res.status(400).json({
                success:false,
                message:"Question Not found",
            })
        }

        await Question.findByIdAndUpdate({_id:question._id},
                                             {
                                                upvote: upvote +1
                                             },
                                             {new:true});

        return res.status(200).json({
            success:true,
            message:"Upvoted............."
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error While Upvote"
        })
    }
}



exports.downVote =  async (req,res)=>{
    try{
        const {questionId} = req.body;

        if(!questionId){
            return  res.status(400).json({
                success:false,
                message:"questionId not found",
            })
        }

        const question = await Question.findById({_id:questionId});

        if(!question){
            return res.status(400).json({
                success:false,
                message:"Question Not found",
            })
        }

        await Question.findByIdAndUpdate({_id:question._id},
                                             {
                                                downvote: downvote +1
                                             },
                                             {new:true});

        return res.status(200).json({
            success:true,
            message:"downVoted............."
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error While downvote"
        })
    }
}


exports.comments  =  async (req,res)=>{
    try{
        const {questionId,desc} =  req.body;

        const userId  =  req.user.id;

        const user  =  await User.findById({_id:userId});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not found"
            })
        }

        const  question =  await Question.findById({_id:questionId});

        if(!question){
            return res.status(400).json({
                 success:false,
                 message:"Question Not found"
            })
        }

         question.comments.push({
            by:userId,
            name:user.name,
            desc
        })

        await question.save();

        return res.status(200).json({
            success:true,
            message:"ans would be saved successfully"
        })
    }
    catch(error){
        return  res.status(400).json({
            success:false,
            message:"errror while commenting"
        })
    }
}


