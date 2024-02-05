import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema= new Schema({
    email: {
        type: String,
        required: true 
    },
    password: { 
        type: String,
        required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
  }
}, {timestamps:true});

export default mongoose.model('User',userSchema);