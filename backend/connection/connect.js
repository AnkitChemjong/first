import mongoose from "mongoose";
function Connect(url){

    return mongoose.connect(url);
}
export default Connect;