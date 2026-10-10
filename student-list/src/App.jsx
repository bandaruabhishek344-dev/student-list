
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import StudentCard from "./components/StudentCard";
import StudentModal from "./components/StudentModal";
import "./App.css";

const initialStudents = [
  {
    id: "STU001",
    name: "Sai Kumar",
    email: "sai.kumar@example.com",
    course: "Computer Science",
    year: "3rd Year",
    bio: "Interested in web development.",
    color: "green",
  },
  {
    id: "STU002",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    course: "Business Studies",
    year: "2nd Year",
    bio: "Interested in business management.",
    color: "purple",
  },
  {
    id: "STU003",
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    course: "Mechanical",
    year: "4th Year",
    bio: "Passionate about engineering.",
    color: "orange",
  },
  {
    id: "STU004",
    name: "Ananya Reddy",
    email: "ananya.reddy@example.com",
    course: "Computer Science",
    year: "1st Year",
    bio: "Learning programming.",
    color: "blue",
  },
  {
    id: "STU005",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    course: "Mechanical",
    year: "2nd Year",
    bio: "Enjoys practical projects.",
    color: "orange",
  },
  {
    id: "STU006",
    name: "Neha Patel",
    email: "neha.patel@example.com",
    course: "Business Studies",
    year: "3rd Year",
    bio: "Interested in entrepreneurship.",
    color: "purple",
  },
  {
    id: "STU007",
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    course: "Computer Science",
    year: "4th Year",
    bio: "Interested in software engineering.",
    color: "green",
  },
  {
    id: "STU008",
    name: "Sneha Iyer",
    email: "sneha.iyer@example.com",
    course: "Mechanical",
    year: "1st Year",
    bio: "Enjoys solving engineering problems.",
    color: "blue",
  },
];

function loadStudents() {
  try {
    const saved = localStorage.getItem("student-management-data");
    return saved ? JSON.parse(saved) : initialStudents;
  } catch {
    return initialStudents;
  }
}

function App() {
  const [students, setStudents] = useState(loadStudents);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "student-management-data",
      JSON.stringify(students)
    );
  }, [students]);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch = [
        student.name,
        student.email,
        student.id,
        student.course,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesCourse =
        selectedCourse === "All" ||
        student.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [students, search, selectedCourse]);

  const courses = [
    "All",
    "Computer Science",
    "Business Studies",
    "Mechanical",
  ];

  const courseColors = {
    "Computer Science": "green",
    "Business Studies": "purple",
    Mechanical: "orange",
  };

  function openAddModal() {
    setEditingStudent(null);
    setModalOpen(true);
  }

  function openEditModal(student) {
    setEditingStudent(student);
    setModalOpen(true);
  }

  function saveStudent(formData) {
    const emailExists = students.some(
      (student) =>
        student.email.toLowerCase() === formData.email.toLowerCase() &&
        student.id !== editingStudent?.id
    );

    if (emailExists) {
      return "A student with this email already exists.";
    }

    if (editingStudent) {
      setStudents((current) =>
        current.map((student) =>
          student.id === editingStudent.id
            ? { ...student, ...formData }
            : student
        )
      );
      setNotice("Student details updated successfully.");
    } else {
      const newStudent = {
        ...formData,
        id: formData.id || generateStudentId(students),
        color: courseColors[formData.course] || "green",
      };

      if (
        students.some(
          (student) => student.id === newStudent.id
        )
      ) {
        return "This student ID already exists.";
      }

      setStudents((current) => [...current, newStudent]);
      setNotice("New student added successfully.");
    }

    setModalOpen(false);
    setEditingStudent(null);
    return "";
  }

  function generateStudentId(list) {
    let number = list.reduce((max, student) => {
      const match = student.id.match(/^STU(\d+)$/);
      return match ? Math.max(max, Number(match[1])) : max;
    }, 0) + 1;

    let id = `STU${String(number).padStart(3, "0")}`;

    while (list.some((student) => student.id === id)) {
      number += 1;
      id = `STU${String(number).padStart(3, "0")}`;
    }

    return id;
  }

  function deleteStudent(student) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) return;

    setStudents((current) =>
      current.filter((item) => item.id !== student.id)
    );
    setNotice(`${student.name} was deleted.`);
  }

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <div className="app-layout">
      <Sidebar onAddStudent={openAddModal} />

      <main className="main-area">
        <header className="topbar">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search by name, email, or student ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search students"
            />
            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="topbar-profile">
            <span className="online-dot" />
            <div className="admin-avatar">A</div>
            <div className="admin-info">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <section className="page-content">
          <div className="welcome-row">
            <div>
              <span className="eyebrow">STUDENT DIRECTORY</span>
              <h1>Student Management</h1>
              <p>
                Manage your students, their courses, and academic progress.
              </p>
            </div>

            <button className="primary-button" onClick={openAddModal}>
              <span>＋</span> Add Student
            </button>
          </div>

          {notice && (
            <div className="notice" role="status">
              <span>✓</span> {notice}
              <button onClick={() => setNotice("")} aria-label="Dismiss">
                ×
              </button>
            </div>
          )}

          <section className="stats-grid">
            <div className="stat-card stat-total">
              <div className="stat-icon">♙</div>
              <div>
                <span>Total Students</span>
                <strong>{students.length}</strong>
                <small>Registered students</small>
              </div>
            </div>

            <div className="stat-card stat-green">
              <div className="stat-icon">▱</div>
              <div>
                <span>Computer Science</span>
                <strong>
                  {students.filter(
                    (s) => s.course === "Computer Science"
                  ).length}
                </strong>
                <small>Enrolled students</small>
              </div>
            </div>

            <div className="stat-card stat-purple">
              <div className="stat-icon">▤</div>
              <div>
                <span>Business Studies</span>
                <strong>
                  {students.filter(
                    (s) => s.course === "Business Studies"
                  ).length}
                </strong>
                <small>Enrolled students</small>
              </div>
            </div>

            <div className="stat-card stat-orange">
              <div className="stat-icon">⚙</div>
              <div>
                <span>Mechanical</span>
                <strong>
                  {students.filter((s) => s.course === "Mechanical").length}
                </strong>
                <small>Enrolled students</small>
              </div>
            </div>
          </section>

          <div className="list-heading">
            <div>
              <h2>All Students</h2>
              <p>
                Showing {filteredStudents.length} of {students.length} students
              </p>
            </div>

            <label className="filter-select">
              <span>Course:</span>
              <select
                value={selectedCourse}
                onChange={(event) => setSelectedCourse(event.target.value)}
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course === "All" ? "All Courses" : course}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <section className="students-grid">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={openEditModal}
                onDelete={deleteStudent}
              />
            ))}
          </section>

          {filteredStudents.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">⌕</div>
              <h3>No students found</h3>
              <p>Try another search term or change the course filter.</p>
              <button
                className="secondary-button"
                onClick={() => {
                  setSearch("");
                  setSelectedCourse("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          <footer className="page-footer">
            <span>StudentHub · Student Administration</span>
            <span>Student records are saved in this browser</span>
          </footer>
        </section>
      </main>

      {modalOpen && (
        <StudentModal
          student={editingStudent}
          onClose={() => {
            setModalOpen(false);
            setEditingStudent(null);
          }}
          onSave={saveStudent}
          existingStudents={students}
        />
      )}
    </div>
  );
}

export default App;