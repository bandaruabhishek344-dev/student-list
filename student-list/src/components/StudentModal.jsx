
import { useEffect, useState } from "react";
import "./StudentModal.css";
const emptyForm = {
  id: "",
  name: "",
  email: "",
  course: "",
  year: "",
  bio: "",
  profilePhoto: "",
};

function StudentModal({
  student,
  onClose,
  onSave,
  existingStudents,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");
  const [photoName, setPhotoName] = useState("");

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id || "",
        name: student.name || "",
        email: student.email || "",
        course: student.course || "",
        year: student.year || "",
        bio: student.bio || "",
        profilePhoto: student.profilePhoto || "",
      });
    } else {
      setFormData(emptyForm);
    }

    setError("");
    setPhotoName("");
  }, [student]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Profile photo must be smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((current) => ({
        ...current,
        profilePhoto: reader.result,
      }));
      setPhotoName(file.name);
      setError("");
    };

    reader.onerror = () => {
      setError("Unable to read this image. Please try another.");
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const id = formData.id.trim().toUpperCase();

    if (!name || !email || !formData.course || !formData.year) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (id && !/^STU[A-Z0-9-]+$/.test(id)) {
      setError("Student ID must start with STU.");
      return;
    }

    const duplicateEmail = existingStudents.some(
      (item) =>
        item.email.toLowerCase() === email &&
        item.id !== student?.id
    );

    if (duplicateEmail) {
      setError("This email is already registered.");
      return;
    }

    const duplicateId = id && existingStudents.some(
      (item) =>
        item.id.toUpperCase() === id &&
        item.id !== student?.id
    );

    if (duplicateId) {
      setError("This student ID is already in use.");
      return;
    }

    const result = onSave({
      ...formData,
      id: id || formData.id,
      name,
      email,
      bio: formData.bio.trim(),
      color:
        formData.course === "Business Studies"
          ? "purple"
          : formData.course === "Mechanical"
            ? "orange"
            : "green",
    });

    if (result) setError(result);
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="student-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal-header">
          <div>
            <span className="modal-eyebrow">
              STUDENT DIRECTORY
            </span>
            <h2 id="modal-title">
              {student ? "Edit Student" : "Add New Student"}
            </h2>
            <p>
              {student
                ? "Update the student's information."
                : "Enter the details to register a new student."}
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="form-error" role="alert">
                <span>!</span> {error}
              </div>
            )}

            <div className="form-grid">
              <label className="form-field">
                <span>Full Name <b>*</b></span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  maxLength={80}
                  required
                  autoFocus
                />
              </label>

              <label className="form-field">
                <span>Student ID</span>
                <input
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Auto-generated if blank"
                  maxLength={20}
                />
              </label>

              <label className="form-field">
                <span>Email Address <b>*</b></span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  maxLength={120}
                  required
                />
              </label>

              <label className="form-field">
                <span>Course <b>*</b></span>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select course</option>
                  <option value="Computer Science">
                    Computer Science
                  </option>
                  <option value="Business Studies">
                    Business Studies
                  </option>
                  <option value="Mechanical">Mechanical</option>
                </select>
              </label>

              <label className="form-field">
                <span>Academic Year <b>*</b></span>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                </select>
              </label>

              <div className="form-field">
                <span>Profile Photo</span>
                <div className="photo-upload">
                  {formData.profilePhoto ? (
                    <img
                      src={formData.profilePhoto}
                      alt="Student preview"
                      className="photo-preview"
                    />
                  ) : (
                    <div className="photo-placeholder">♙</div>
                  )}

                  <div className="photo-upload-controls">
                    <label className="upload-button">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </label>
                    <small>
                      {photoName || "JPG, PNG · Max 2 MB"}
                    </small>
                    {formData.profilePhoto && (
                      <button
                        type="button"
                        className="remove-photo"
                        onClick={() => {
                          setFormData((current) => ({
                            ...current,
                            profilePhoto: "",
                          }));
                          setPhotoName("");
                        }}
                      >
                        Remove photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <label className="form-field full-width">
                <span>Student Bio <small>(Optional)</small></span>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write a short introduction about the student..."
                  rows={3}
                  maxLength={300}
                />
                <small className="character-count">
                  {formData.bio.length}/300 characters
                </small>
              </label>
            </div>
          </div>

          <footer className="modal-footer">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              <span>✓</span>
              {student ? "Save Changes" : "Save Student"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default StudentModal;