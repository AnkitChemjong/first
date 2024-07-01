import {Schema,model} from "mongoose";


const userSchema=new Schema({
    userName:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true,
    }
})

const User=model("Luser",userSchema);
export default User;