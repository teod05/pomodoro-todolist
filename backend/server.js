import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import Todo from './models/todo.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));

// Database connection
const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString)
    .then(() => console.log('Connected to the database…'))
    .catch((err) => {
        console.error('Connection error:', err);
        process.exit(1);
    });

// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/todo', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post("/todo/new", async (req, res) => {
    const name = req.body;

    // Validation
    if (!name) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const newTask = await Todo.create(req.body);
        res.status(201).json({ newTask });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/todo/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Todo.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/todo/:id", async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const updatedTask = await Todo.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

