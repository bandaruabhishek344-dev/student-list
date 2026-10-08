import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    } catch (error) {
      console.error("Failed to load user:", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (email, role) => {
    const loggedInUser = {
      email,
      role,
      loginTime: new Date().toISOString(),
    };

    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      isUser: user?.role === "user",
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}