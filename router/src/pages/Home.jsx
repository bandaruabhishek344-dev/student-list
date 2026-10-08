import { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const banners = [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="home">
      {/* Hero Banner */}
      <section
        className="banner"
        style={{
          backgroundImage: `url(${banners[currentSlide]})`,
        }}
      >
        <div className="banner-content">
          <h1>Welcome To Our Store 🛍️</h1>
          <p>
            Discover amazing electronics, gadgets, and accessories at
            affordable prices.
          </p>

          <button className="shop-btn">
            Shop Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>🚚 Free Delivery</h3>
          <p>Fast and secure delivery on all orders.</p>
        </div>

        <div className="feature-card">
          <h3>💰 Best Prices</h3>
          <p>Get premium products at competitive prices.</p>
        </div>

        <div className="feature-card">
          <h3>⭐ Quality Products</h3>
          <p>Shop from trusted brands and top-rated products.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Why Choose Us?</h2>
        <p>
          We provide high-quality products with excellent customer service.
          Browse our collection and enjoy a seamless shopping experience.
        </p>
      </section>
    </div>
  );
}

export default Home;