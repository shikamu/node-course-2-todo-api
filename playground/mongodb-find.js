const {MongoClient, ObjectID} = require("mongodb");

let obj = new ObjectID();
console.log(obj);

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log("unable to connect to the MongoDB server.");
    }
    console.log("connected to MongoDB server");
    const db = client.db("TodoApp");
    
    // db.collection("Todos").find({
    //     _id: new ObjectID("5b001729116b8223a4a208be")
    // }).toArray().then((docs) => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log("unable to fetch todos", err);
    // });
    
    // db.collection("Todos").find().count().then((count) => {
    //     console.log(`Todos count: ${count}.`);        
    // }, (err) => {
    //     console.log("unable to fetch todos", err);
    // });


    db.collection("Users").find({
        name: "Shikamu"
    }).toArray().then((docs) => {
        console.log("Users");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("unable to fetch todos", err);
    });

    //client.close();
});