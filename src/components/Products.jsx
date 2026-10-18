import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=30")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);

  // Get unique categories from the products
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Search and filter products
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort the filtered products by price
  if (sortOrder === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <p className="products-subtitle">
        Discover something you will love.
      </p>

      <div className="products-filters">
        <input
          type="text"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>

          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat.replaceAll("-", " ")}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort by: Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <p className="products-count">
        {filteredProducts.length} products found
      </p>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-card-image">
              <img
                src={product.thumbnail}
                alt={product.title}
              />
            </div>

            <div className="product-card-content">
              <p className="product-category">
                {product.category.replaceAll("-", " ")}
              </p>

              <h3>{product.title}</h3>

              <p className="product-card-price">
                ${product.price}
              </p>

              <p className="product-card-rating">
                ⭐ {product.rating} / 5
              </p>

              <Link
                to={`/products/${product.id}`}
                className="product-card-button"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="products-message">
          No products match your search.
        </p>
      )}
    </div>
  );
}

export default Products;