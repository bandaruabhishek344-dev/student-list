import "./Products.css";

function Products({ addToCart }) {
  const products = [
    {
      id: 1,
      name: "Laptop",
      brand: "Apple",
      price: 35000,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    },
    {
      id: 2,
      name: "Computer",
      brand: "DELL",
      price: 45000,
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500",
    },
    {
      id: 4,
      name: "Mouse",
      brand: "DELL",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    },
    {
      id: 5,
      name: "Desktop",
      brand: "Lenovo",
      price: 52000,
      image:
        "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500",
    },
    {
      id: 6,
      name: "Mobile",
      brand: "Apple",
      price: 52000,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div className="products-page">
      <h1 className="products-title">Products</h1>

      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
            />

            <h3>{product.name}</h3>
            <p>Brand: {product.brand}</p>
            <p className="price">₹{product.price}</p>

            <button
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;