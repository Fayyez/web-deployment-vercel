const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const todoRoutes = require('./src/routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes go here
app.use('/api/todos', todoRoutes);
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the Todo API',
        endpoints: {
            getAllTodos: 'GET /api/todos',
            getSingleTodo: 'GET /api/todos/:id',
            createTodo: 'POST /api/todos'
        }
    });
});

// html for display
app.get('/', (req, res) => {
    const todoFilePath = path.join(__dirname, 'src/data/todos.json');
    const todos = JSON.parse(fs.readFileSync(todoFilePath, 'utf8'));

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Simple Todo App</title>
    </head>
    <body>
      <h1>Todo List</h1>
      
      <form id="todoForm">
        <h2>Add New Todo</h2>
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required>
        </div>
        <div>
          <label for="description">Description:</label>
          <input type="text" id="description" name="description">
        </div>
        <button type="submit">Add Todo</button>
      </form>
      
      <h2>Current Todos</h2>
      <ul id="todoList">
        ${todos.map(todo => `
          <li>
            <strong>${todo.title}</strong> - 
            ${todo.description} - 
            Status: ${todo.completed ? 'Completed' : 'Pending'}
          </li>
        `).join('')}
      </ul>

      <script>
        document.getElementById('todoForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const title = document.getElementById('title').value;
          const description = document.getElementById('description').value;
          
          try {
            const response = await fetch('/api/todos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ title, description })
            });
            
            if (response.ok) {
              // Refresh the page to show the new todo
              window.location.reload();
            } else {
              alert('Failed to add todo');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
          }
        });
      </script>
    </body>
    </html>
  `;

    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes