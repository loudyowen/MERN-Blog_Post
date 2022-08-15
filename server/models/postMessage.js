import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    creatorId : String,
    tags: [String],
    selectedFile: String,
    likes:{
        // contain all id
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('postMessage', postSchema);

export default PostMessage;
