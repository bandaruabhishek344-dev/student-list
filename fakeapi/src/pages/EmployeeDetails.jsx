import {
  useParams,
  useNavigate,
} from "react-router-dom";

import useFetch from "../hooks/useFetch";

function EmployeeDetails() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const {
    data: employee,
    loading,
    error,
  } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (loading)
    return <h2>Loading...</h2>;

  if (error)
    return <h2>{error}</h2>;

  return (
    <div className="container">
      <h1>
        Employee Details
      </h1>

      <h2>{employee.name}</h2>

      <p>Email: {employee.email}</p>

      <p>Phone: {employee.phone}</p>

      <p>
        Website:
        {employee.website}
      </p>

      <button
        onClick={() =>
          navigate(-1)
        }
      >
        Back
      </button>
    </div>
  );
}

export default EmployeeDetails;