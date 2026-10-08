import React from "react";

class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      hasError: false,
      error: null,
    };

  }

  static getDerivedStateFromError(error) {

    return {
      hasError: true,
      error,
    };

  }

  componentDidCatch(error, errorInfo) {

    console.error(
      "Error Boundary:",
      error
    );

    console.error(
      "Error Info:",
      errorInfo
    );

  }

  handleRetry = () => {

    this.setState({
      hasError: false,
      error: null,
    });

  };

  render() {

    if (this.state.hasError) {

      if (this.props.fallback) {

        return React.cloneElement(
          this.props.fallback,
          {
            onRetry: this.handleRetry,
            error: this.state.error,
          }
        );

      }

      return (
        <div className="error-fallback">

          <h1>
            ⚠️ Something went wrong
          </h1>

          <p>
            {this.state.error?.message}
          </p>

          <button
            onClick={this.handleRetry}
          >
            🔄 Try Again
          </button>

        </div>
      );

    }

    return this.props.children;

  }

}

export default ErrorBoundary;