import mongoose = require("mongoose");
import {db} from "../db/mongoose";

var userSchema = new mongoose.Schema({
    email:
    {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});
export var User = db.connection.model("User", userSchema);
