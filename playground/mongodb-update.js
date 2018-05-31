const {MongoClient, ObjectID} = require("mongodb");

let obj = new ObjectID();
console.log(obj);

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log("unable to connect to the MongoDB server.");
    }
    console.log("connected to MongoDB server");
    const db = client.db("TodoApp");
    /*
    db.collection("Todos").findOneAndUpdate({
        _id: new ObjectID("5b00226f29731b5666a6e3de")
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    */
   db.collection("Users").findOneAndUpdate(
    {
    _id: 123
    }, {
        $set: {
            name: "Shikamu"
        },
        $inc:
        {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //client.close();
});