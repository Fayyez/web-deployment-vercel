const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const todosFilePath = path.join(__dirname, '../data/todos.json');

// Helper function to read todos from JSON file
const readTodos = () => {
  const todosData = fs.readFileSync(todosFilePath, 'utf8');
  return JSON.parse(todosData);
};

// Helper function to write todos to JSON file
const writeTodos = (todos) => {
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), 'utf8');
};

// GET all todos
router.get('/', (req, res) => {
  try {
    const todos = readTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving todos', error: error.message });
  }
});

// GET a single todo by ID
router.get('/:id', (req, res) => {
  try {
    const todos = readTodos();
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving todo', error: error.message });
  }
});

// POST create a new todo
router.post('/', (req, res) => {
  try {
    const todos = readTodos();
    
    // Validate required fields
    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    // Generate a new ID (simple approach)
    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    
    const newTodo = {
      id: newId,
      title: req.body.title,
      description: req.body.description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    writeTodos(todos);
    
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
});

module.exports = router;