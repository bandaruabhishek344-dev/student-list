import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";

import Profile from "./pages/Profile";

function App() {

  return (

    <BrowserRouter>

      <nav
        style={{
          padding:20,
        }}
      >

        <Link to="/">
          Home
        </Link>

        {" | "}

        <Link to="/profile">
          Profile
        </Link>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;