
import mongoose from "mongoose";

const shortUrlSchema  = mongoose.Schema({
    full_url:{
        type:String,
        required:true
    },
    short_url : {
        type: String,
        required:true,
        unique:true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const urlSchema = mongoose.model("shortUrl", shortUrlSchema);
export default urlSchema;
