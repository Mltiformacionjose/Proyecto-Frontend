function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error" role="alert">
      <p className="error__message">{message}</p>
      {onRetry && (
        <button className="error__button" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;