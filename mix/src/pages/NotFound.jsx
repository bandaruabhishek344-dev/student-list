import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
}

export default NotFound;