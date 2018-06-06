const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

//clear database
beforeEach((done) =>{
    Todo.remove({}).then(()=>done ());
});

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
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e:any) => done(e));
            });
    });
});