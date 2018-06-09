import mongoose = require("mongoose");

export namespace db
{
    (<any>mongoose).Promise = global.Promise;
    export var connection: mongoose.Connection = mongoose.createConnection(process.env.MONGODB_URI ||"mongodb://localhost:27017/TodoApp");
    export var ObjectID = mongoose.Types.ObjectId;
    console.log("created connection");
}
