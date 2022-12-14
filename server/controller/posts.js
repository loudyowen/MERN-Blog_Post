import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req,res)=>{
    try{
    
        const postMessage = await PostMessage.find();
           
        res.status(200).json(postMessage);
    
    }catch(error){
       
        res.status(404).json({message: error.message})
    }
};

export const createPost = async (req,res) => {
    const post = req.body;

    const newPost = new PostMessage({...post, createdAt: new Date().toISOString()});

    try {
       
        await newPost.save();

        res.status(201).json(newPost)
  
    } catch (error) {
    
        res.status(409).json({message: error.message})
   
    }
}

export const updatePost = async (req, res) =>{
    const { id:_id } = req.params;
   
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this ID');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new : true});

    res.json(updatePost)
}

export const deletePost = async (req,res) => {
    const { id } = req.params;
     
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this ID');

    await PostMessage.findByIdAndRemove(id);
    
    res.json({message: "Post successfully deleted"})
}

export const likePost = async(req,res) => {
    const { id } = req.params;
    // check if user is login
    // we can get req.userId because auth middleware has been called first
    if(!req.userId) return res.json({message: 'Unathenticated'})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this ID');

    const post = await PostMessage.findById(id);
    // find the user id
    const index = post.likes.findIndex((id)=> id === String(req.userId));
    // check if the userId is not exist in likes database
    if(index==-1) {
        // like
        post.likes.push(req.userId)
    }else{
        // dislike
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
    }

    const updateLikePost = await PostMessage.findByIdAndUpdate(id, post, {new: true} ) 
   
    res.json(updateLikePost)
}