import "./Sidebar.css";

function Sidebar({ onAddStudent })
{
  return (
    <aside className="sidebar">
      <a href="#home" className="brand">
        <span className="brand-icon">🎓</span>
        <span>Student<span className="brand-highlight">Hub</span></span>
      </a>

      <div className="sidebar-label">MENU</div>

      <nav className="sidebar-nav">
        <a href="#students" className="nav-link active">
          <span>♙</span> Students
        </a>

        <button className="nav-link" onClick={onAddStudent}>
          <span>＋</span> Add Student
        </button>

        <a href="#overview" className="nav-link">
          <span>⌂</span> Dashboard
        </a>

        <a href="#settings" className="nav-link">
          <span>⚙</span> Settings
        </a>
      </nav>

      <div className="sidebar-bottom">
        <div className="graduation-icon">▱</div>
        <h3>Better Students</h3>
        <p>Brighter Future.</p>
        <div className="sidebar-version">STUDENT PORTAL · v1.0</div>
      </div>
    </aside>
  );
}

export default Sidebar;