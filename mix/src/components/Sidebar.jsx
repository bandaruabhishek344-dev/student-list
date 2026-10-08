import React, {
  useContext,
} from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  ThemeContext,
} from "../context/ThemeContext";

import {
  toast,
} from "react-toastify";

import "../styles/Sidebar.css";


function Sidebar({
  isOpen,
  onClose,
}) {

  const navigate =
    useNavigate();


  /* ==========================================
        AUTH CONTEXT
  ========================================== */

  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );


  /* ==========================================
        THEME CONTEXT
  ========================================== */

  const {
    darkMode,
    toggleTheme,
  } = useContext(
    ThemeContext
  );


  /* ==========================================
        LOGOUT
  ========================================== */

  const handleLogout = () => {

    logout();

    toast.success(
      "Logged out successfully"
    );

    navigate(
      "/login"
    );

  };


  /* ==========================================
        CLOSE SIDEBAR AFTER NAVIGATION
  ========================================== */

  const handleNavigation = () => {

    if (onClose) {

      onClose();

    }

  };


  /* ==========================================
        SIDEBAR LINK CLASS
  ========================================== */

  const getLinkClass = ({
    isActive,
  }) => {

    return isActive
      ? "sidebar-link active"
      : "sidebar-link";

  };


  return (

    <>

      {/* ======================================
            MOBILE BACKDROP
      ====================================== */}

      {isOpen && (

        <div
          className="sidebar-backdrop"
          onClick={onClose}
        />

      )}


      {/* ======================================
            SIDEBAR
      ====================================== */}

      <aside
        className={
          isOpen
            ? "admin-sidebar open"
            : "admin-sidebar"
        }
      >


        {/* ====================================
              LOGO
        ==================================== */}

        <div className="sidebar-logo">

          <span className="sidebar-logo-icon">
            🍔
          </span>


          <div>

            <h2>
              Food Explorer
            </h2>

            <small>
              Admin Panel
            </small>

          </div>


          {/* Mobile close */}

          <button
            type="button"
            className="sidebar-mobile-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>

        </div>


        {/* ====================================
              USER INFORMATION
        ==================================== */}

        <div className="sidebar-user">

          <div className="user-avatar">
            👨‍💼
          </div>


          <div className="sidebar-user-info">

            <strong>
              {user?.email || "Admin"}
            </strong>

            <span>
              {user?.role || "admin"}
            </span>

          </div>

        </div>


        {/* ====================================
              NAVIGATION
        ==================================== */}

        <nav className="sidebar-nav">

          <p className="sidebar-title">
            MAIN MENU
          </p>


          {/* Dashboard */}

          <NavLink
            to="/admin"
            end
            onClick={handleNavigation}
            className={getLinkClass}
          >

            <span>
              📊
            </span>

            <span>
              Dashboard
            </span>

          </NavLink>


          {/* Recipes */}

          <NavLink
            to="/admin/recipes"
            onClick={handleNavigation}
            className={getLinkClass}
          >

            <span>
              🍽️
            </span>

            <span>
              Recipes
            </span>

          </NavLink>


          {/* Users */}

          <NavLink
            to="/admin/users"
            onClick={handleNavigation}
            className={getLinkClass}
          >

            <span>
              👥
            </span>

            <span>
              Users
            </span>

          </NavLink>


          {/* Reports */}

          <NavLink
            to="/admin/reports"
            onClick={handleNavigation}
            className={getLinkClass}
          >

            <span>
              📈
            </span>

            <span>
              Reports
            </span>

          </NavLink>


          {/* ==================================
                USER SECTION
          ================================== */}

          <p className="sidebar-title">
            USER
          </p>


          {/* Profile */}

          <NavLink
            to="/profile"
            onClick={handleNavigation}
            className={getLinkClass}
          >

            <span>
              👤
            </span>

            <span>
              Profile
            </span>

          </NavLink>


          {/* Food Explorer */}

          <NavLink
            to="/"
            onClick={handleNavigation}
            className={getLinkClass}
          >

            <span>
              🏠
            </span>

            <span>
              Food Explorer
            </span>

          </NavLink>

        </nav>


        {/* ====================================
              SIDEBAR BOTTOM
        ==================================== */}

        <div className="sidebar-bottom">


          {/* ==================================
                THEME TOGGLE
          ================================== */}

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >

            <span className="theme-icon">

              {darkMode
                ? "☀️"
                : "🌙"}

            </span>


            <span>

              {darkMode
                ? "Light Mode"
                : "Dark Mode"}

            </span>

          </button>


          {/* ==================================
                LOGOUT
          ================================== */}

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >

            <span>
              🚪
            </span>

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>

    </>

  );

}


export default React.memo(
  Sidebar
);