import React from "react";
import ErrorFallback from "./ErrorFallback";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      resetKey: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  handleRetry = () => {
    this.setState((prevState) => ({
      hasError: false,
      resetKey: prevState.resetKey + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback retry={this.handleRetry} />;
    }

    return (
      <React.Fragment key={this.state.resetKey}>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default ErrorBoundary;