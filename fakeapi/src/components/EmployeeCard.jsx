import { Link } from "react-router-dom";

function EmployeeCard({
  employee,
  onDelete,
}) {
  return (
    <div className="card">
      <h3>
        <Link
          to={`/employees/${employee.id}`}
        >
          {employee.name}
        </Link>
      </h3>

      <p>{employee.email}</p>

      <button
        onClick={() =>
          onDelete(employee.id)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default EmployeeCard;