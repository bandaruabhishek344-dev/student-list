import "../styles/errorFallback.css";

function ErrorFallback({ retry }) {
  return (
    <div className="error-container">
      <h1>⚠️ Oops!</h1>

      <h2>Something went wrong.</h2>

      <p>The application encountered an unexpected error.</p>

      <button onClick={retry}>
        Retry
      </button>
    </div>
  );
}

export default ErrorFallback;