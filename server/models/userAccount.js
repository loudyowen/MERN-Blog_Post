import mongoose from "mongoose";

const user = mongoose.Schema({
    id:{
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        // required: true
    },
    email:{
        type: String,
        required: true
    },
    image: String

})

const userAccount = mongoose.model('user',user)

export default userAccount;