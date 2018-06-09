const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");


const todos = [{
    text: "First test todo"
}, {
    text: "Second test todo"
}];

beforeEach((done) =>{
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos, (err:any, docs:any) =>{
            if(err)
            {
                console.log("failed to add test data, err=", err);
            }
        });
    }).then(() => done());
});

/*
beforeEach((done) =>{
    Todo.remove({}).then(()=> done());
});
*/
describe("POST /todos", () =>{
    it("should create a new todo", (done) =>{
        let text = "Test todo text";
        request(app)
            .post("/todos")
            .send({text})
            .expect(200)
            .expect((res : any) =>{
                expect(res.body.text).toBe(text);
            })
            .end((err : any|undefined, res : any) =>{
                if(err)
                {
                    return done(err);
                }
                Todo.find().then((todos:any) =>{
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch((e:any) => done(e));
            });
    });

    it("should not create todo with invalid body data", (done) =>{
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err:any|undefined, res:any) =>{
                if(err)
                {
                    return done(err);
                }

                Todo.find().then((todos:any) =>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e:any) => done(e));
            });
    });    
});

describe("GET /todos", () =>{
    it("should get all todos", (done) =>{
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res:any) =>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});