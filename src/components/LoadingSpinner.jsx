function LoadingSpinner() {
  return (
    <div className="loading" role="status" aria-label="Cargando personajes">
      <div className="loading__spinner"></div>
      <p>Cargando personajes...</p>
    </div>
  );
}

export default LoadingSpinner;