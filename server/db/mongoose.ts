import mongoose = require("mongoose");

export namespace db
{
    (<any>mongoose).Promise = global.Promise;
    export var connection: mongoose.Connection = mongoose.createConnection("mongodb://localhost:27017/TodoApp");
    console.log("created connection");
}
