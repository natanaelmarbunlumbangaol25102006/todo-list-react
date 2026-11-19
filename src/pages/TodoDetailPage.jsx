import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoModal from "../components/TodoModal";

export default function TodoDetailPage({ todos, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const todo = todos.find((item) => item.id === Number(id));

  if (!todo) {
    return (
      <div className="detail-wrapper">
        <div className="detail-card" style={{ display: "block", textAlign: "center" }}>
          <p style={{ marginBottom: "16px" }}>Tugas tidak ditemukan.</p>
          <button className="btn btn-danger" onClick={() => navigate("/")}>
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const handleSaveUpdate = (updatedData) => {
    onUpdate(todo.id, updatedData);
    setIsEditOpen(false);
    setFeedback("Tugas berhasil diperbarui.");
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-container">
        {feedback && <div className="toast-banner">{feedback}</div>}
        <div className="detail-card">
          <div>
            <div className="detail-group">
              <div className="detail-label">Judul</div>
              <div className="detail-text">{todo.title}</div>
            </div>
            <div className="detail-group">
              <div className="detail-label">Deskripsi</div>
              <div className="detail-desc-box">{todo.description || "-"}</div>
            </div>
          </div>

          <div>
            <div className="detail-group">
              <div className="detail-label">Status</div>
              <div className="detail-text">{todo.status}</div>
            </div>
            <div className="detail-group">
              <div className="detail-label">Prioritas</div>
              <div className="detail-text">{todo.priority}</div>
            </div>
            <div className="detail-group">
              <div className="detail-label">Deadline</div>
              <div className="detail-text">{todo.deadline}</div>
            </div>
            <div className="detail-actions">
              <button className="btn btn-danger" onClick={() => navigate("/")}>
                Kembali
              </button>
              <button className="btn btn-primary" onClick={() => setIsEditOpen(true)}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <TodoModal
          modalTitle="Update Todo"
          submitLabel="Update"
          initialData={todo}
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleSaveUpdate}
        />
      )}
    </div>
  );
}
