"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("../db/mongoose");
exports.todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});
exports.Todo = mongoose_1.db.connection.model("Todo", exports.todoSchema);
