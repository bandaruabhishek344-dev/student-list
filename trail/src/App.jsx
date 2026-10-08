import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FoodDetails from "./pages/FoodDetails";
import NotFound from "./pages/NotFound";




function App() {
  return (
    <>
      <Header />

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/food/:id" element={<FoodDetails />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<NotFound />} />
           
      

        </Routes>
      </ErrorBoundary>

      <Footer />
    </>
  );
}

export default App;