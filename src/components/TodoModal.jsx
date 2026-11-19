import { useState } from "react";

export default function TodoModal({ modalTitle, submitLabel, initialData, onClose, onSubmit }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "to-do");
  const [priority, setPriority] = useState(initialData?.priority || "low");
  const [deadline, setDeadline] = useState(initialData?.deadline || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) {
      alert("Judul dan Deadline wajib diisi!");
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      deadline,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{modalTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul tugas"
              required
            />
          </div>
          <div className="form-group">
            <label>Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi tugas"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>
            <div className="form-group">
              <label>Prioritas</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
