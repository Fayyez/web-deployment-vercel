# Todo List API

A simple RESTful API for managing todo items built with Express.js and using JSON file for data storage.

## Features

- Create, read, update, and delete todo items
- JSON-based data persistence
- RESTful API endpoints
- CORS enabled

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1. Clone this repository
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

The server will run on `http://localhost:3000` by default.

## API Endpoints

| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| GET    | /              | API information      |
| GET    | /api/todos     | Get all todos        |
| GET    | /api/todos/:id | Get a specific todo  |
| POST   | /api/todos     | Create a new todo    |
| PUT    | /api/todos/:id | Update a todo        |
| DELETE | /api/todos/:id | Delete a todo        |

### Example Requests

#### Create a Todo

```http
POST /api/todos
Content-Type: application/json

{
  "title": "Learn Express.js",
  "description": "Build a RESTful API with Express"
}
```

#### Update a Todo

```http
PUT /api/todos/1
Content-Type: application/json

{
  "completed": true
}
```

## Development

For development with automatic server restart on file changes:

```
npm run dev
```

Note: You need to install nodemon globally or as a dev dependency to use this command.

## Data Structure

Each todo item has the following structure:

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "createdAt": "2025-05-09T12:00:00.000Z"
}
```