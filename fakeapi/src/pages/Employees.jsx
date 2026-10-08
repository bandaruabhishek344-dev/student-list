import { useState, useEffect } from "react";

import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";
import useFetch from "../hooks/useFetch";

function Employees() {
  const {
    data,
    loading,
    error,
    refetch,
  } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  // Load employees from localStorage on first render
  const [employees, setEmployees] =
    useState(() => {
      const savedEmployees =
        localStorage.getItem("employees");

      return savedEmployees
        ? JSON.parse(savedEmployees)
        : [];
    });

  const [show, setShow] =
    useState(true);

  // Load API data only if localStorage is empty
  useEffect(() => {
    if (
      data &&
      employees.length === 0
    ) {
      setEmployees(data);
    }
  }, [data]);

  // Save employees to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem(
      "employees",
      JSON.stringify(employees)
    );
  }, [employees]);

  const addEmployee = (
    employee
  ) => {
    setEmployees([
      ...employees,
      employee,
    ]);
  };

  const deleteEmployee = (id) => {
    setEmployees(
      employees.filter(
        (emp) => emp.id !== id
      )
    );
  };

  return (
    <div className="container">
      <h1>Employees</h1>

      <EmployeeForm
        addEmployee={addEmployee}
      />

      <button
        onClick={() =>
          setShow(!show)
        }
      >
        {show ? "Hide" : "Show"}
      </button>

      {loading && (
        <h2>Loading...</h2>
      )}

      {error && (
        <>
          <h3>{error}</h3>

          <button onClick={refetch}>
            Retry
          </button>
        </>
      )}

      {!loading &&
        !error &&
        show &&
        employees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onDelete={deleteEmployee}
          />
        ))}
    </div>
  );
}

export default Employees;