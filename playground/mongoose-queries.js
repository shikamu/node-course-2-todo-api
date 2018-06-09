const {ObjectID} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");

var id = "5b1bcff081dfe733f0bff6a3";
if(!ObjectID.isValid(id))
{
    console.log("invalid id");
}
// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log("Todos:", todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) =>{
//    console.log("Todo:", todo); 
// });

Todo.findById(id).then((todo) =>{
    if(!todo)
    {
        return console.log(`id ${id} not found`);
    }
    console.log("Todo by id:", todo); 
 }).catch((e) => console.log(e));
 