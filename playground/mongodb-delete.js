const {MongoClient, ObjectID} = require("mongodb");

let obj = new ObjectID();
console.log(obj);

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log("unable to connect to the MongoDB server.");
    }
    console.log("connected to MongoDB server");
    const db = client.db("TodoApp");
    
    // delete many
    // db.collection("Todos").deleteMany({text: "Eat lunch"}).then((result) => {
    //     console.log(result);
    // });
    // delete one
    // db.collection("Todos").deleteOne({text: "Eat lunch"}).then((result) => {
    //     console.log(result);
    // });

    // find one and delete
    // db.collection("Todos").findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    db.collection("Users").deleteMany({name: "Shikamu"});
    db.collection("Users").findOneAndDelete({
        _id: new ObjectID("5b001a145452bd343c85baf3")
    }).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });

    //client.close();
});