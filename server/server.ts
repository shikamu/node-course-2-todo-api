import express = require('express');
import bodyParser = require("body-parser")

import {db} from "./db/mongoose";
import {Todo} from "./models/todo"
//import * as todo from "./models/todo"
import {User} from "./models/user"

//var Todo = connection.model("Todo", todo.todoSchema);

const port = process.env.PORT || 3000;
export const app = express();

app.use(bodyParser.json())

app.post("/todos", (req, res) =>{
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) =>{
        res.send(doc);
    }, (e) =>{
        res.status(400).send(e);
    });
});

app.get("/todos", (req, res) =>{
    Todo.find().then((todos) =>{
        res.send({todos});
    }, (e) =>{
        res.status(400).send(e);
    });
});

app.get("/todos/:id", (req, res) =>{
    var id = req.params.id;
    if(!db.ObjectID.isValid(id))
    {
        console.log("invalid");
        return res.status(404).send();
    }
    else
    {
        Todo.findById(id).then((todo) =>{
            if(!todo)
            {
                console.log("not found");
                return res.status(404).send();
            }
            res.status(200).send({todo});
        }).catch((e) => res.status(400).send());
    }
});

app.listen(port, ()=>{
    console.log("Started on port", port);
});



// newTodo.save().then((doc) =>{
//     console.log("Saved todo", JSON.stringify(doc, undefined, 2));
// }, (e) =>{
//     console.log("Unable to save todo", e);
// });
var newUser = new User({
    email: "bla"
});
// newUser.save().then((doc) =>{
//     console.log("Saved user", JSON.stringify(doc, undefined, 2));
// }, (e) =>{
//     console.log("Unable to save user", e);
// });
