import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import initialTodos from "./data/initialTodos";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (newData) => {
    const nextId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos([...todos, { id: nextId, ...newData }]);
  };

  const handleUpdateTodo = (id, updatedData) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo)));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <TodoListPage
              todos={todos}
              onAdd={handleAddTodo}
              onDelete={handleDeleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={<TodoDetailPage todos={todos} onUpdate={handleUpdateTodo} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
