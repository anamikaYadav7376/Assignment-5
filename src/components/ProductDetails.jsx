import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);

                if (!res.ok) {
                    throw new Error("Product not found");
                }

                const data = await res.json();
                setProduct(data);

            } catch (err) {
                setError(err.message);

            } finally {
                setLoading(false);

            }
        }

        fetchProduct();

    }, [id]);

    if (loading) return <p className="status">Loading product...</p>;
    if (error) return <p className="status">{error}</p>;
    if (!product) return <p className="status">Product not found.</p>;

    return (
        <div className="product-details">
            <div className="details-image">
                <img src={product.thumbnail} alt={product.title} />
            </div>

            <div className="details-content">
                <p className="category">{product.category}</p>

                <h1>{product.title}</h1>

                <p className="brand">
                    Brand: {product.brand || "Not specified"}
                </p>

                <p className="description">{product.description}</p>

                <div className="price-section">
                    <span className="price">${product.price}</span>
                    <span className="discount">
                        {product.discountPercentage}% OFF
                    </span>
                </div>

                <p className="stock">
                    {product.stock > 0
                        ? `${product.stock} items in stock`
                        : "Out of stock"}
                </p>

                <div className="rating">
                    ⭐ {product.rating} / 5
                </div>

                <h2>Customer Reviews</h2>

                <div className="reviews">
                    {product.reviews?.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div className="review-card" key={index}>
                                <div className="review-top">
                                    <strong>{review.reviewerName}</strong>
                                    <span>⭐ {review.rating}/5</span>
                                </div>

                                <p>{review.comment}</p>
                                <small>
                                    {new Date(review.date).toLocaleDateString()}
                                </small>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;