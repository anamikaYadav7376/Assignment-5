import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Home from "./components/Home";
import Category from "./components/Category"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
        <Route
          path="/category/:name"
          element={<Category />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;