export  const files = {
    src: {
      // Because it's a directory, add the "directory" key
      directory: {
        // This is a file - provide its path as a key:
        "App.jsx": {
          // Because it's a file, add the "file" key
          file: {
            contents: `
              import { useState } from "react";
  
  const App = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
  
    // Add a new todo
    const addTodo = () => {
      if (todo.trim() === "") return;
      setTodos([...todos, todo.trim()]);
      setTodo("");
    };
  
    // Edit an existing todo
    const editTodo = (index) => {
      setEditingIndex(index);
      setTodo(todos[index]);
    };
  
    // Save the edited todo
    const saveTodo = () => {
      if (todo.trim() === "") return;
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = todo.trim();
      setTodos(updatedTodos);
      setEditingIndex(null);
      setTodo("");
    };
  
    // Delete a todo
    const deleteTodo = (index) => {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    };
  
    return (
      <div
        style={{
          minHeight: "100vh",
          overflow: "hidden", // Hide scrollbars
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom right, #4fd1c5, #667eea)",
          margin: 0, // Remove default margin
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "32px",
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              color: "#2d3748",
              marginBottom: "24px",
            }}
          >
            Todo App
          </h1>
  
          <div style={{ display: "flex", marginBottom: "24px" }}>
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Enter a new task"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px 0 0 8px",
                outline: "none",
                fontSize: "1rem",
              }}
            />
            <button
              onClick={editingIndex !== null ? saveTodo : addTodo}
              style={{
                padding: "12px",
                backgroundColor: "#4fd1c5",
                color: "white",
                borderRadius: "0 8px 8px 0",
                border: "none",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#38b2ac")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#4fd1c5")}
            >
              {editingIndex !== null ? "Save" : "Add"}
            </button>
          </div>
  
          <div style={{ marginTop: "16px" }}>
            {todos.length === 0 ? (
              <p style={{ textAlign: "center", color: "#a0aec0" }}>No tasks yet!</p>
            ) : (
              todos.map((todo, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px",
                    backgroundColor: "#f7fafc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "1.125rem", color: "#2d3748" }}>
                    {todo}
                  </span>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => editTodo(index)}
                      style={{
                        backgroundColor: "transparent",
                        color: "#4fd1c5",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1rem",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#38b2ac")}
                      onMouseLeave={(e) => (e.target.style.color = "#4fd1c5")}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(index)}
                      style={{
                        backgroundColor: "transparent",
                        color: "#e53e3e",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1rem",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#c53030")}
                      onMouseLeave={(e) => (e.target.style.color = "#e53e3e")}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default App;
  
                `,
          },
        },
        "main.jsx": {
          file: {
            contents: `
                  import { StrictMode } from 'react'
                  import { createRoot } from 'react-dom/client'
                  
                   import App from './App.jsx'
  
                      createRoot(document.getElementById('root')).render(
                      <StrictMode>
                          <App />
                      </StrictMode>,
                       )            
  
                  
                  `,
          },
        },
  
      },
    },
    'package.json':{
      file:{
          contents:`
         {
    "name": "wc",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "lint": "eslint .",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^18.3.1",
      "react-dom": "^18.3.1"
    },
    "devDependencies": {
      "@eslint/js": "^9.17.0",
      "@types/react": "^18.3.18",
      "@types/react-dom": "^18.3.5",
      "@vitejs/plugin-react": "^4.3.4",
      "eslint": "^9.17.0",
      "eslint-plugin-react": "^7.37.2",
      "eslint-plugin-react-hooks": "^5.0.0",
      "eslint-plugin-react-refresh": "^0.4.16",
      "globals": "^15.14.0",
      "vite": "^6.0.5"
    }
  }
  
          
          `
      }
    },
    'index.html':{
      file:{
          contents:`
          <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.jsx"></script>
    </body>
  </html>
  
          `
      }
    },
    'vite.config.js':{
      file:{
          contents:`
          import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  
  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react()],
    server:{
      host:'0.0.0.0',
      port:4000
    }
  })
  
          `
      }
    }
  };
  