import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import "./BookDetails.css";

const API_URL = "https://book-review-app-1-b9ch.onrender.com/api";

export default function BookDetails() {
  const { state: book } = useLocation();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch Favorites
  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${API_URL}/favorites`);

      if (!res.ok) {
        throw new Error("Failed to fetch favorites");
      }

      const data = await res.json();
      setFavorites(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Favorites fetch error:", error);
      setFavorites([]);
    }
  };

  // Fetch Reviews
  const fetchReviews = async () => {
    if (!book?._id) return;

    try {
      const res = await fetch(`${API_URL}/reviews/${book._id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Reviews fetch error:", error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [book?._id]);

  // Popup Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!book) {
    return (
      <div className="bookPage">
        <h2>No Book Selected</h2>
        <button onClick={() => navigate("/")}>🏠 Home</button>
      </div>
    );
  }

  const isSaved = favorites.some(
    (f) => f.bookId === book._id || f.bookId?._id === book._id
  );

  // Toggle Favorite
  const toggleFavorite = async () => {
    try {
      const url = `${API_URL}/favorites/${book._id}`;

      const res = await fetch(url, {
        method: isSaved ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        ...(isSaved ? {} : { body: JSON.stringify(book) }),
      });

      if (!res.ok) {
        throw new Error("Failed to update favorite");
      }

      await fetchFavorites();
    } catch (error) {
      console.error("Toggle favorite error:", error);
      alert("Could not update favorite. Please try again.");
    }
  };

  // Submit Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !rating || !comment.trim()) {
      alert("Please fill all fields");
      return;
    }

    const reviewData = {
      bookId: book._id,
      bookTitle: book.title,
      username: username.trim(),
      email: email.trim(),
      rating,
      comment: comment.trim(),
    };

    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      setUsername("");
      setEmail("");
      setRating(0);
      setComment("");
      setShowPopup(false);

      await fetchReviews();
    } catch (error) {
      console.error("Submit review error:", error);
      alert("Could not submit review. Please try again.");
    }
  };

  return (
    <div className="bookPage">
      {/* BOOK DETAILS */}
      <div className="bookContainer">
        <div
          className={`saveIcon ${isSaved ? "saved" : ""}`}
          onClick={toggleFavorite}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleFavorite();
            }
          }}
        >
          {isSaved ? "❤️" : "🤍"}
        </div>

        {book.image && (
          <div className="bookCover">
            <img src={book.image} alt={book.title} />
          </div>
        )}

        <div className="bookContent">
          <h1>{book.title}</h1>
          <p>✍️ {book.author}</p>

          {book.category && <p>📚 {book.category}</p>}

          {book.story && (
            <div className="storyBox">
              <h3>📖 Short Story</h3>
              <p>{book.story}</p>
            </div>
          )}

          {book.moral && (
            <div className="moralBox">
              <h3>🌟 Moral</h3>
              <p>{book.moral}</p>
            </div>
          )}
        </div>
      </div>

      {/* REVIEW POPUP */}
      {showPopup && (
        <div className="popupOverlay">
          <div className="popupCard">
            <h2>⭐ Rate This Book</h2>

            <form onSubmit={handleSubmitReview}>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              >
                <option value={0}>Select Rating</option>
                <option value={1}>⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={5}>⭐⭐⭐⭐⭐</option>
              </select>

              <textarea
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />

              <div className="popupButtons">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>

                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVIEWS */}
      <div className="reviewsList">
        <h2>⭐ Reviews ({reviews.length})</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r, i) => (
            <div key={r._id || i} className="reviewCard">
              <div className="reviewHeader">
                <div className="avatar">
                  {r.username?.charAt(0).toUpperCase()}
                </div>

                <div className="userInfo">
                  <h4>{r.username}</h4>
                  <p>{r.email}</p>
                </div>

                <div className="reviewTime">
                  {r.createdAt &&
                    formatDistanceToNow(new Date(r.createdAt), {
                      addSuffix: true,
                    })}
                </div>
              </div>

              <div className="reviewStars">
                {"⭐".repeat(Number(r.rating) || 0)}
              </div>

              <div className="reviewComment">{r.comment}</div>
            </div>
          ))
        )}
      </div>

      <div className="bottomBack">
        <button onClick={() => navigate(-1)}>
          Back to Explore
        </button>
      </div>
    </div>
  );
}