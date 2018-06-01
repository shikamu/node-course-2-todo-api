import mongoose = require("mongoose");
import {db} from "../db/mongoose";


export var todoSchema = new mongoose.Schema({
    text:
    {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }, 
    completed:
    {
        type: Boolean,
        default: false
    }, 
    completedAt:
    {
        type: Number,
        default: null
    }
});
export var Todo = db.connection.model("Todo", todoSchema);
