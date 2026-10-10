import "./StudentCard.css";
function StudentCard({ student, onEdit, onDelete }) {
  const initials = student.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const color = student.color || "green";

  return (
    <article className="student-card">
      <div className="student-card-top">
        {student.profilePhoto ? (
          <img
            className="student-avatar"
            src={student.profilePhoto}
            alt={student.name}
          />
        ) : (
          <div className={`student-avatar avatar-${color}`}>
            {initials}
          </div>
        )}

        <div className="student-heading">
          <h3>{student.name}</h3>
          <span className="student-id">{student.id}</span>
        </div>

        <span className="student-status" title="Registered">
          ●
        </span>
      </div>

      <div className="student-tags">
        <span className={`course-badge badge-${color}`}>
          {student.course}
        </span>
      </div>

      <div className="student-details">
        <div>
          <span className="detail-label">Academic Year</span>
          <strong>{student.year}</strong>
        </div>

        <div>
          <span className="detail-label">Email Address</span>
          <span className="student-email" title={student.email}>
            {student.email}
          </span>
        </div>

        {student.bio && (
          <p className="student-bio">{student.bio}</p>
        )}
      </div>

      <div className="card-actions">
        <button
          className="edit-button"
          onClick={() => onEdit(student)}
        >
          <span>✎</span> Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(student)}
        >
          <span>⌫</span> Delete
        </button>
      </div>
    </article>
  );
}

export default StudentCard;