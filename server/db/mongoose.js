"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var db;
(function (db) {
    mongoose.Promise = global.Promise;
    db.connection = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp");
    db.ObjectID = mongoose.Types.ObjectId;
    console.log("created connection");
})(db = exports.db || (exports.db = {}));
