import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">WELCOME TO OUR STORE</p>

          <h1>Find Your Everyday Favorites.</h1>

          <p className="hero-description">
            Discover amazing products at great prices.
            Find something you love and make it yours.
          </p>

          <Link to="/products" className="shop-btn">
            Shop Now →
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=900"
            alt="A collection of lifestyle products"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;