"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose_1 = require("./db/mongoose");
var todo_1 = require("./models/todo");
//import * as todo from "./models/todo"
var user_1 = require("./models/user");
//var Todo = connection.model("Todo", todo.todoSchema);
var port = process.env.PORT || 3000;
exports.app = express();
exports.app.use(bodyParser.json());
exports.app.post("/todos", function (req, res) {
    var todo = new todo_1.Todo({
        text: req.body.text
    });
    todo.save().then(function (doc) {
        res.send(doc);
    }, function (e) {
        res.status(400).send(e);
    });
});
exports.app.get("/todos", function (req, res) {
    todo_1.Todo.find().then(function (todos) {
        res.send({ todos: todos });
    }, function (e) {
        res.status(400).send(e);
    });
});
exports.app.get("/todos/:id", function (req, res) {
    var id = req.params.id;
    if (!mongoose_1.db.ObjectID.isValid(id)) {
        console.log("invalid");
        return res.status(404).send();
    }
    else {
        todo_1.Todo.findById(id).then(function (todo) {
            if (!todo) {
                console.log("not found");
                return res.status(404).send();
            }
            res.status(200).send({ todo: todo });
        }).catch(function (e) { return res.status(400).send(); });
    }
});
exports.app.listen(port, function () {
    console.log("Started on port", port);
});
// newTodo.save().then((doc) =>{
//     console.log("Saved todo", JSON.stringify(doc, undefined, 2));
// }, (e) =>{
//     console.log("Unable to save todo", e);
// });
var newUser = new user_1.User({
    email: "bla"
});
// newUser.save().then((doc) =>{
//     console.log("Saved user", JSON.stringify(doc, undefined, 2));
// }, (e) =>{
//     console.log("Unable to save user", e);
// });
