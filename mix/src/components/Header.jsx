import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  useTheme,
} from "../context/ThemeContext";

import "../styles/Header.css";

function Header() {

  const {
    user,
    logout,
    isAdmin,
    isUser,
  } = useContext(AuthContext);

  const {
    darkMode,
    theme,
    toggleTheme,
  } = useTheme();

  const navigate =
    useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const profileRef =
    useRef(null);

  const handleLogout = () => {

    const confirmLogout =
      window.confirm(
        "Do you want to logout?"
      );

    if (confirmLogout) {

      logout();

      navigate("/login");

    }

  };

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {

        setProfileOpen(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  const closeMenu = () => {

    setMenuOpen(false);

  };

  return (

    <header
      className={`header ${
        darkMode ? "dark" : ""
      }`}
    >

      {/* LOGO */}

      <div className="brand">

        <Link
          to="/"
          onClick={closeMenu}
        >

          🍔

          <span>

            Food Explorer

          </span>

        </Link>

      </div>

      {/* MOBILE MENU */}

      <button
        className="menu-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
        aria-label="Toggle Menu"
      >

        {menuOpen
          ? "✖"
          : "☰"}

      </button>

      {/* NAVIGATION */}

      <nav
        className={
          menuOpen
            ? "nav active"
            : "nav"
        }
      >

        {isUser && (

          <>

            <NavLink
              to="/"
              onClick={closeMenu}
            >
              🏠 Home
            </NavLink>

            <NavLink
              to="/cart"
              onClick={closeMenu}
            >
              🛒 Cart
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={closeMenu}
            >
              ❤️ Wishlist
            </NavLink>

            <NavLink
              to="/profile"
              onClick={closeMenu}
            >
              👤 Profile
            </NavLink>

          </>

        )}

        {isAdmin && (

          <NavLink
            to="/admin"
            onClick={closeMenu}
          >
            📊 Dashboard
          </NavLink>

        )}

      </nav>

      {/* RIGHT SECTION */}

      <div className="header-actions">

        {isUser && (

          <button
            className="search-btn"
            onClick={() =>
              navigate("/")
            }
            title="Search Foods"
          >

            🔍

          </button>

        )}

        {/* THEME TOGGLE */}

        <div
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Current Theme : ${theme}`}
        >

          <div
            className={`toggle-switch ${
              darkMode
                ? "active"
                : ""
            }`}
          >

            <div
              className="toggle-circle"
            >

              {darkMode
                ? "🌙"
                : "☀️"}

            </div>

          </div>

        </div>

                {/* PROFILE */}

        {user && (

          <div
            className="profile"
            ref={profileRef}
          >

            <button
              className="profile-btn"
              onClick={() =>
                setProfileOpen(
                  !profileOpen
                )
              }
              title="Profile"
            >

              {user.role === "admin"
                ? "👨‍💼"
                : "👤"}

              {" "}▼

            </button>

            {profileOpen && (

              <div
                className="profile-menu"
              >

                <div className="profile-info">

                  <h4>

                    {user.role === "admin"
                      ? "Administrator"
                      : "User"}

                  </h4>

                  <p>

                    {user.email}

                  </p>

                </div>

                <hr />

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >

                  🚪 Logout

                </button>

              </div>

            )}

          </div>

        )}

      </div>

    </header>

  );

}

export default Header;