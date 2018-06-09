"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("../db/mongoose");
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});
exports.User = mongoose_1.db.connection.model("User", userSchema);
