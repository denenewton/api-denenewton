import mongoose, { models } from "mongoose";


const Schema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    
})
const Post = models.Post || mongoose.model('Post' , Schema);
export default Post