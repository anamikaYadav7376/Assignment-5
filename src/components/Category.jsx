import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Category.css";

function Category() {
  const { name } = useParams();

  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("low");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://dummyjson.com/products/category/${encodeURIComponent(name)}`
        );

        if (!res.ok) {
          throw new Error("Could not fetch products");
        }

        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [name]);

  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "low"
      ? a.price - b.price
      : b.price - a.price
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-page">
      <h1>{name.replaceAll("-", " ")}</h1>

      <div className="category-toolbar">
        <p>{products.length} products found</p>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="category-grid">
        {sortedProducts.map((product) => (
          <div className="category-card" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
            </Link>

            <h3>{product.title}</h3>
            <p className="category-price">${product.price}</p>

            <Link
              className="details-link"
              to={`/products/${product.id}`}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}

export default Category;