import { useState } from "react";

function EmployeeForm({
  addEmployee,
}) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Fill all fields");
      return;
    }

    addEmployee({
      id: Date.now(),
      name,
      email,
    });

    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button type="submit">
        Add Employee
      </button>
    </form>
  );
}

export default EmployeeForm;