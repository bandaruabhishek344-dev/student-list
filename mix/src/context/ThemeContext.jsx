import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";

/* ==========================================
      CREATE THEME CONTEXT
========================================== */

export const ThemeContext =
  createContext(null);


/* ==========================================
      THEME PROVIDER
========================================== */

export function ThemeProvider({
  children,
}) {

  /* ========================================
        GET INITIAL THEME
  ======================================== */

  const getInitialTheme = () => {

    try {

      const savedTheme =
        localStorage.getItem("theme");

      /* Saved theme */

      if (
        savedTheme === "light" ||
        savedTheme === "dark"
      ) {

        return savedTheme;

      }

      /* Browser system theme */

      const systemDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      return systemDark
        ? "dark"
        : "light";

    } catch (error) {

      console.error(
        "Theme initialization error:",
        error
      );

      return "light";

    }

  };


  /* ========================================
        THEME STATE
  ======================================== */

  const [theme, setTheme] =
    useState(getInitialTheme);


  const darkMode =
    theme === "dark";


  /* ========================================
        APPLY THEME
  ======================================== */

  useEffect(() => {

    /* Body class */

    document.body.classList.toggle(
      "dark",
      darkMode
    );


    /* HTML attribute */

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );


    /* Save theme */

    localStorage.setItem(
      "theme",
      theme
    );

  }, [
    theme,
    darkMode,
  ]);


  /* ========================================
        SYSTEM THEME LISTENER
  ======================================== */

  useEffect(() => {

    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );


    const handleChange =
      (event) => {

        /*
          Only use system theme when
          user has not manually selected
          a theme.
        */

        const savedTheme =
          localStorage.getItem(
            "theme"
          );


        if (!savedTheme) {

          setTheme(
            event.matches
              ? "dark"
              : "light"
          );

        }

      };


    /* Modern browsers */

    if (
      mediaQuery.addEventListener
    ) {

      mediaQuery.addEventListener(
        "change",
        handleChange
      );

    }

    /* Older browsers */

    else {

      mediaQuery.addListener(
        handleChange
      );

    }


    /* Cleanup */

    return () => {

      if (
        mediaQuery.removeEventListener
      ) {

        mediaQuery.removeEventListener(
          "change",
          handleChange
        );

      }

      else {

        mediaQuery.removeListener(
          handleChange
        );

      }

    };

  }, []);


  /* ========================================
        TOGGLE THEME
  ======================================== */

  const toggleTheme =
    useCallback(() => {

      setTheme(
        (previousTheme) => {

          return previousTheme ===
            "dark"
            ? "light"
            : "dark";

        }
      );

    }, []);


  /* ========================================
        CHANGE THEME
  ======================================== */

  const changeTheme =
    useCallback(
      (newTheme) => {

        if (
          newTheme !== "light" &&
          newTheme !== "dark"
        ) {

          return;

        }

        setTheme(newTheme);

      },
      []
    );


  /* ========================================
        CONTEXT VALUE
  ======================================== */

  const value =
    useMemo(
      () => ({

        theme,

        darkMode,

        toggleTheme,

        changeTheme,

        setTheme,

      }),
      [
        theme,
        darkMode,
        toggleTheme,
        changeTheme,
      ]
    );


  /* ========================================
        PROVIDER
  ======================================== */

  return (

    <ThemeContext.Provider
      value={value}
    >

      {children}

    </ThemeContext.Provider>

  );

}


/* ==========================================
      CUSTOM HOOK
========================================== */

export function useTheme() {

  const context =
    useContext(
      ThemeContext
    );


  if (!context) {

    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );

  }


  return context;

}


export default ThemeProvider;