import {Schema,model} from "mongoose";
import {make} from '../services/jwthai.js';
import validator from 'validator';
import { createHmac,randomBytes } from "crypto";


const userSchema=new Schema({
    userName:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please fill a valid email address'],
    },
    password:{
        type: 'string',
        required: true,
    },
    salt:{
        type:'string',
        required:false
    }
},{timestamps:true});

userSchema.pre('save',function (next){
   const user=this;
   const password=user.password;
   if(!user.isModified("password")) return next();
   const salt=randomBytes(16).toString('hex');
   const haspassword=createHmac('sha256',salt).update(password).digest('hex');
   this.password=haspassword;
   this.salt=salt;

   next();
});
userSchema.static('userChecker',async function(email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error("user not found");
    const userPassword=user.password;
    const userSalt=user.salt;
    const haspassword=createHmac('sha256',userSalt).update(password).digest('hex');
    if(userPassword!=haspassword) throw new Error("password doesn't match");
    const token=make(user);
    return token;
} )

const User=model("Luser",userSchema);
export default User;