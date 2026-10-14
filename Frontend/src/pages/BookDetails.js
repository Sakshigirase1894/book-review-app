import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import "./BookDetails.css";

export default function BookDetails() {
  const { state: book } = useLocation();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  // Review states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);

  // ---------------- FAVORITES ----------------
  useEffect(() => {
    fetch("http://localhost:5000/api/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(Array.isArray(data) ? data : []))
      .catch(() => setFavorites([]));
  }, []);

  // ---------------- REVIEWS FETCH ----------------
  useEffect(() => {
    if (!book?._id) return;

    fetch(`http://localhost:5000/api/reviews/${book._id}`)
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]));
  }, [book]);

  // ---------------- POPUP TIMER ----------------
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

  const isSaved = favorites.some((f) => f.bookId === book._id);

  // ---------------- FAVORITES ----------------
  const toggleFavorite = async () => {
    if (isSaved) {
      await fetch(`http://localhost:5000/api/favorites/${book._id}`, {
        method: "DELETE",
      });
    } else {
      await fetch(`http://localhost:5000/api/favorites/${book._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
    }

    const res = await fetch("http://localhost:5000/api/favorites");
    const data = await res.json();
    setFavorites(Array.isArray(data) ? data : []);
  };

  // ---------------- SUBMIT REVIEW ----------------
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!username || !email || !rating || !comment) {
      alert("Please fill all fields");
      return;
    }

    const reviewData = {
      bookId: book._id,
      bookTitle: book.title,
      username,
      email,
      rating,
      comment,
    };

    await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    setUsername("");
    setEmail("");
    setRating(0);
    setComment("");
    setShowPopup(false);

    const res = await fetch(`http://localhost:5000/api/reviews/${book._id}`);
    const data = await res.json();
    setReviews(Array.isArray(data) ? data : []);
  };
  return (
    <div className="bookPage">

      {/* BOOK DETAILS */}
      <div className="bookContainer">
        <div
          className={`saveIcon ${isSaved ? "saved" : ""}`}
          onClick={toggleFavorite}
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

      {/* POPUP */}
      {showPopup && (
        <div className="popupOverlay">
          <div className="popupCard">

            <h2>⭐ Rate This Book</h2>

            <input
              type="text"
              placeholder="Enter Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="0">Select Rating</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="popupButtons">
              <button onClick={() => setShowPopup(false)}>
                Close
              </button>

              <button onClick={handleSubmitReview}>
                Submit
              </button>
            </div>

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

            <div key={i} className="reviewCard">

              <div className="reviewHeader">

                <div className="avatar">

                  {r.username?.charAt(0).toUpperCase()}

                </div>

                <div className="userInfo">

                  <h4>{r.username}</h4>

                  <p>{r.email}</p>

                </div>

                <div className="reviewTime">
                  {formatDistanceToNow(new Date(r.createdAt), {
                    addSuffix: true,
                  })}
                </div>

              </div>

              <div className="reviewStars">

                {"⭐".repeat(r.rating)}

              </div>

              <div className="reviewComment">

                {r.comment}

              </div>

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