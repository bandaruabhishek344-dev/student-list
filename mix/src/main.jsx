import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";


/* ==========================
      MAIN APP
========================== */

import App from "./App";


/* ==========================
      CONTEXT PROVIDERS
========================== */

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  CartProvider,
} from "./context/CartContext";

import {
  WishlistProvider,
} from "./context/WishlistContext";

import {
  ErrorProvider,
} from "./context/ErrorContext";

import {
  ThemeProvider,
} from "./context/ThemeContext";


/* ==========================
      GLOBAL CSS
========================== */

import "./styles/Theme.css";

import "./styles/Responsive.css";


/* =====================================================
      ROOT RENDER
===================================================== */

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    {/* =================================================
          ROUTER
    ================================================= */}

    <BrowserRouter>

      {/* =================================================
            THEME CONTEXT

            Controls:
            - Light mode
            - Dark mode
            - Theme switcher
      ================================================= */}

      <ThemeProvider>

        {/* =================================================
              AUTH CONTEXT

              Controls:
              - Login
              - Logout
              - User
              - Role
              - Admin/User authorization
              - localStorage authentication
        ================================================= */}

        <AuthProvider>

          {/* =================================================
                ERROR CONTEXT

                Controls:
                - Error Boundary testing
                - Error reset
          ================================================= */}

          <ErrorProvider>

            {/* =================================================
                  CART CONTEXT

                  Global cart state
            ================================================= */}

            <CartProvider>

              {/* =================================================
                    WISHLIST CONTEXT

                    Global wishlist state
              ================================================= */}

              <WishlistProvider>

                {/* =========================================
                      MAIN APPLICATION
                ========================================= */}

                <App />

              </WishlistProvider>

            </CartProvider>

          </ErrorProvider>

        </AuthProvider>

      </ThemeProvider>

    </BrowserRouter>

  </React.StrictMode>

);