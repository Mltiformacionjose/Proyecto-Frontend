function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        ← Anterior
      </button>
      <span className="pagination__info">
        Página {page} de {totalPages}
      </span>
      <button
        className="pagination__button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Siguiente →
      </button>
    </div>
  );
}

export default Pagination;