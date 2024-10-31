import mongoose , { models }from "mongoose";


const Schema = mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:false
    },
    active: {
        type:Boolean,
        required:true
    }
})
const User = models.User || mongoose.model('User' , Schema);
export default User;