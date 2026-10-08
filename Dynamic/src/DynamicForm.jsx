import { useState } from "react";
import formConfig from "./formConfig.json";

function DynamicForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e, field) => {
    const value =
      field.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    setFormData({
      ...formData,
      [field.name]: value,
    });
  };

  const validate = () => {
    let newErrors = {};

    formConfig.forEach((field) => {
      if (
        field.required &&
        (!formData[field.name] ||
          formData[field.name] === "")
      ) {
        newErrors[field.name] =
          `${field.label} is required`;
      }

      if (
        field.type === "email" &&
        formData[field.name]
      ) {
        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] =
            "Invalid Email Format";
        }
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmittedData(formData);
  };

  return (
    <div className="container">
      <h2>Student Registration Form</h2>

      <form onSubmit={handleSubmit}>
        {formConfig.map((field) => (
          <div key={field.name} className="field">
            <label>{field.label}</label>

            {field.type === "text" ||
            field.type === "email" ? (
              <input
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  handleChange(e, field)
                }
              />
            ) : field.type === "dropdown" ? (
              <select
                value={formData[field.name] || ""}
                onChange={(e) =>
                  handleChange(e, field)
                }
              >
                <option value="">
                  Select {field.label}
                </option>

                {field.options.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="checkbox"
                checked={
                  formData[field.name] || false
                }
                onChange={(e) =>
                  handleChange(e, field)
                }
              />
            )}

            {errors[field.name] && (
              <p className="error">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <button type="submit">
          Register
        </button>
      </form>

      {submittedData && (
        <div className="result">
          <h3>Submitted Data</h3>
          <pre>
            {JSON.stringify(
              submittedData,
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

export default DynamicForm;