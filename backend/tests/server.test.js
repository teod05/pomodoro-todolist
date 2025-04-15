import request from 'supertest';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Todo from '../models/todo.js';

dotenv.config();

// cia yra naujas express app (testavimui)
const app = express();
app.use(express.json());
app.use(cors());

// Importuoju routes from server.js
app.get('/', (req,res) => {
    res.send("Hello World")
});

app.get('/todo', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch(e){
        res.status(500).json({error: 'Internal servor error'})
    }
});

app.post("/todo/new", async (req, res) => {
    const { name } = req.body

    if(!name){
        return res.status(400).json({error: "Missing required fields"})
    }

    try{
        const newTask = await Todo.create(req.body)
        res.status(201).json({newTask})
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
});

app.delete("/todo/delete/:id", async (req, res) =>{
    const id = req.params.id

    try{
        const result = await Todo.findByIdAndDelete(id)
        res.status(200).json(result)
    } catch(error){
        res.status(404).json({error: "Task not found"})
    }
});

app.put("/todo/:id", async (req, res) => {
    const id = req.params.id
    const updates = req.body

    try{
        const updatedTask = await Todo.findByIdAndUpdate(id, updates, {new: true})
        res.status(200).json(updatedTask)
    } catch(error){
        res.status(500).json({error: "internal servor error"})
    }
});

// Test data
const testTodo = {
    name: 'Test Todo Item'
};

//ask if I need to t
describe('Todo API Tests', () => {
    beforeAll(async () => {
        // prisijungiu prie database
        const connectionString = process.env.MONGO_URI;
        await mongoose.connect(connectionString);
    });

    afterAll(async () => {
        // Clean up and close the connection
        await mongoose.connection.close();
    });

    describe('GET /todo', () => {
        it('should return an array of todos', async () => {
            const response = await request(app)
                .get('/todo')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /todo/new', () => {
        it('should create a new todo', async () => {
            const response = await request(app)
                .post('/todo/new')
                .send(testTodo)
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body.newTask).toHaveProperty('name', testTodo.name);
        });

        it('should return 400 if name is missing', async () => {
            const response = await request(app)
                .post('/todo/new')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Missing required fields');
        });
    });

    describe('DELETE /todo/delete/:id', () => {
        it('should delete a todo', async () => {
            // Sukuria todoitema kad istrinti
            const createResponse = await request(app)
                .post('/todo/new')
                .send(testTodo);

            const todoId = createResponse.body.newTask._id;

            const response = await request(app)
                .delete(`/todo/delete/${todoId}`)
                .expect(200);

            expect(response.body).toHaveProperty('_id', todoId);
        });

        it('should return 404 if todo not found', async () => {
            const response = await request(app)
                .delete('/todo/delete/123456789012')
                .expect(404);

            expect(response.body).toHaveProperty('error', 'Task not found');
        });
    });
}); 