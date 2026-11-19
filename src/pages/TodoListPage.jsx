import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, TrashIcon } from "../components/Icons";
import TodoModal from "../components/TodoModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function TodoListPage({ todos, onAdd, onDelete }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const showFeedback = (message) => {
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleCreate = (newTodoData) => {
    onAdd(newTodoData);
    setIsAddOpen(false);
    showFeedback("Tugas berhasil ditambahkan.");
  };

  const handleConfirmDelete = (id) => {
    onDelete(id);
    setTodoToDelete(null);
    showFeedback("Tugas berhasil dihapus.");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Todo List</h1>
        <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
          Tambah Todo
        </button>
      </div>

      {feedback && <div className="toast-banner">{feedback}</div>}

      <table className="todo-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Status</th>
            <th>Prioritas</th>
            <th>Deadline</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "24px" }}>
                Belum ada tugas. Klik "Tambah Todo" untuk menambahkan tugas baru.
              </td>
            </tr>
          ) : (
            todos.map((todo) => (
              <tr key={todo.id}>
                <td className="title-cell" title={todo.title}>
                  {todo.title}
                </td>
                <td>{todo.status}</td>
                <td>{todo.priority}</td>
                <td>{todo.deadline}</td>
                <td>
                  <div className="action-cell">
                    <button
                      className="btn btn-primary btn-icon"
                      onClick={() => navigate(`/todo/${todo.id}`)}
                      title="Lihat Detail"
                    >
                      <EyeIcon />
                    </button>
                    <button
                      className="btn btn-danger btn-icon"
                      onClick={() => setTodoToDelete(todo)}
                      title="Hapus Tugas"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isAddOpen && (
        <TodoModal
          modalTitle="Tambah Todo"
          submitLabel="Tambah"
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {todoToDelete && (
        <ConfirmDeleteModal
          todo={todoToDelete}
          onCancel={() => setTodoToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
