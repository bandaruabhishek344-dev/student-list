import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


/* ==========================
      COMMON COMPONENTS
========================== */

import Header from "./components/Header";

import Footer from "./components/Footer";

import ErrorBoundary from "./components/ErrorBoundary";

import ErrorFallback from "./components/ErrorFallback";

import ProtectedRoute from "./components/ProtectedRoute";


/* ==========================
      PAGES
========================== */

import Checkout from "./pages/Checkout";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Cart from "./pages/Cart";

import Wishlist from "./pages/Wishlist";

import FoodDetails from "./pages/FoodDetails";

import AdminDashboard from "./pages/AdminDashboard";

import UserDashboard from "./pages/UserDashboard";

import NotFound from "./pages/NotFound";

import DragDropBoard from "./pages/DragDropBoard";


/* =====================================================
      APP COMPONENT
===================================================== */

function App() {

  return (

    <ErrorBoundary
      fallback={
        <ErrorFallback />
      }
    >

      {/* =================================================
            HEADER
      ================================================= */}

      <Header />


      {/* =================================================
            ROUTES
      ================================================= */}

      <Routes>


        {/* =================================================
              PUBLIC ROUTES
        ================================================= */}

        <Route
          path="/login"
          element={
            <Login />
          }
        />


        {/* =================================================
              USER HOME
        ================================================= */}

        <Route
          path="/"
          element={

            <ProtectedRoute
              role="user"
            >

              <Home />

            </ProtectedRoute>

          }
        />


        {/* =================================================
              CART
        ================================================= */}

        <Route
          path="/cart"
          element={

            <ProtectedRoute
              role="user"
            >

              <Cart />

            </ProtectedRoute>

          }
        />


        {/* =================================================
              WISHLIST
        ================================================= */}

        <Route
          path="/wishlist"
          element={

            <ProtectedRoute
              role="user"
            >

              <Wishlist />

            </ProtectedRoute>

          }
        />


        {/* =================================================
              FOOD DETAILS
        ================================================= */}

        <Route
          path="/food/:id"
          element={

            <ProtectedRoute
              role="user"
            >

              <FoodDetails />

            </ProtectedRoute>

          }
        />


        {/* =================================================
              USER PROFILE
              
              Only USER can access this page.
        ================================================= */}

        <Route
          path="/profile"
          element={

            <ProtectedRoute
              role="user"
            >

              <UserDashboard />

            </ProtectedRoute>

          }
        />


        {/* =================================================
              CHECKOUT
        ================================================= */}

        <Route
          path="/checkout"
          element={

            <ProtectedRoute
              role="user"
            >

              <Checkout />

            </ProtectedRoute>

          }
        />


        {/* =================================================
              DRAG AND DROP
        ================================================= */}

        <Route
          path="/drag-drop"
          element={

            <ProtectedRoute
              role="user"
            >

              <DragDropBoard />

            </ProtectedRoute>

          }
        />


        {/* =================================================
              ADMIN DASHBOARD
              
              Only ADMIN can access this page.
        ================================================= */}

        <Route
          path="/admin"
          element={

            <ProtectedRoute
              role="admin"
            >

              <AdminDashboard />

            </ProtectedRoute>

          }
        />


        {/* =================================================
              ADMIN USERS PAGE
              
              Admin can view all users.
              
              If you have a separate AdminUsers page,
              replace the placeholder below.
        ================================================= */}

        <Route
          path="/admin/users"
          element={

            <ProtectedRoute
              role="admin"
            >

              <AdminDashboard />

            </ProtectedRoute>

          }
        />


        {/* =================================================
              ADMIN REPORTS
              
              Protected admin route.
        ================================================= */}

        <Route
          path="/admin/reports"
          element={

            <ProtectedRoute
              role="admin"
            >

              <AdminDashboard />

            </ProtectedRoute>

          }
        />


        {/* =================================================
              HOME REDIRECT
        ================================================= */}

        <Route
          path="/home"
          element={

            <Navigate
              to="/"
              replace
            />

          }
        />


        {/* =================================================
              DEFAULT REDIRECT
              
              Unknown URL -> NotFound
        ================================================= */}

        <Route
          path="*"
          element={
            <NotFound />
          }
        />

      </Routes>


      {/* =================================================
            FOOTER
      ================================================= */}

      <Footer />


      {/* =================================================
            TOAST NOTIFICATION
      ================================================= */}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

    </ErrorBoundary>

  );

}

export default App;