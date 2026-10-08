import {
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";

import "./App.css";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/employees"
          element={<Employees />}
        />

        <Route
          path="/employees/:id"
          element={
            <EmployeeDetails />
          }
        />

        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
    </>
  );
}

export default App;