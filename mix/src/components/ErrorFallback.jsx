import React, {
  useContext,
} from "react";

import {
  ErrorContext,
} from "../context/ErrorContext";

function ErrorFallback({
  onRetry,
  error,
}) {

  const {
    setShouldCrash,
  } = useContext(ErrorContext);

  const handleRetry = () => {

    // Reset ErrorContext first
    setShouldCrash(false);

    // Reset ErrorBoundary
    if (onRetry) {
      onRetry();
    }

  };

  return (

    <div className="error-fallback">

      <div className="error-card">

        <div className="error-icon">
          ⚠️
        </div>

        <h1>
          Something went wrong
        </h1>

        <p>
          We couldn't load the Food Explorer page.
        </p>

        {error?.message && (
          <small>
            {error.message}
          </small>
        )}

        <button
          type="button"
          onClick={handleRetry}
        >
          🔄 Try Again
        </button>

      </div>

    </div>

  );

}

export default ErrorFallback;