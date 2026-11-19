export default function ConfirmDeleteModal({ todo, onCancel, onConfirm }) {
  if (!todo) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Hapus Todo</h2>
        <p className="confirm-text">
          Apakah Anda yakin ingin menghapus tugas <strong>"{todo.title}"</strong>?
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
          <button type="button" className="btn btn-danger" onClick={() => onConfirm(todo.id)}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
