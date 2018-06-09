"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require("expect");
var request = require("supertest");
var app = require("./../server").app;
var Todo = require("./../models/todo").Todo;
var mongoose_1 = require("./../db/mongoose");
var todos = [{
        _id: new mongoose_1.db.ObjectID(),
        text: "First test todo"
    }, {
        _id: new mongoose_1.db.ObjectID(),
        text: "Second test todo"
    }];
beforeEach(function (done) {
    Todo.remove({}).then(function () {
        return Todo.insertMany(todos, function (err, docs) {
            if (err) {
                console.log("failed to add test data, err=", err);
            }
        });
    }).then(function () { return done(); });
});
/*
beforeEach((done) =>{
    Todo.remove({}).then(()=> done());
});
*/
describe("POST /todos", function () {
    it("should create a new todo", function (done) {
        var text = "Test todo text";
        request(app)
            .post("/todos")
            .send({ text: text })
            .expect(200)
            .expect(function (res) {
            expect(res.body.text).toBe(text);
        })
            .end(function (err, res) {
            if (err) {
                return done(err);
            }
            Todo.find().then(function (todos) {
                expect(todos.length).toBe(3);
                expect(todos[2].text).toBe(text);
                done();
            }).catch(function (e) { return done(e); });
        });
    });
    it("should not create todo with invalid body data", function (done) {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end(function (err, res) {
            if (err) {
                return done(err);
            }
            Todo.find().then(function (todos) {
                expect(todos.length).toBe(2);
                done();
            }).catch(function (e) { return done(e); });
        });
    });
});
describe("GET /todos", function () {
    it("should get all todos", function (done) {
        request(app)
            .get("/todos")
            .expect(200)
            .expect(function (res) {
            expect(res.body.todos.length).toBe(2);
        })
            .end(done);
    });
});
describe("GET /todos/:id", function () {
    it("should return todo doc", function (done) {
        request(app)
            .get("/todos/" + todos[0]._id.toHexString())
            .expect(200)
            .expect(function (res) {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
            .end(done);
    });
    it("should return a 404 if todo not found", function (done) {
        request(app)
            .get("/todos/" + new mongoose_1.db.ObjectID().toHexString())
            .expect(404)
            .end(done);
    });
    it("should return 404 for invalid object IDs", function (done) {
        request(app)
            .get("/todos/123")
            .expect(404)
            .end(done);
    });
});
