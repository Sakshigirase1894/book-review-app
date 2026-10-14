import { useNavigate } from "react-router-dom";
import "./Home.css";
import backgroundImg from "../assets/image.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">📚 ReadToRise</h2>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h1>
          Discover Powerful
          <span className="highlight"> Stories</span>
        </h1>

        <p>
          Explore inspiring books, build better habits,
          improve your mindset and grow every day through reading.
        </p>

        <div className="heroButtons">
          <button
            className="primaryBtn"
            onClick={() => navigate("/explore")}
          >
            🚀 Start Reading
          </button>
        </div>

        {/* Features */}
        <div className="features">
          <div
            className="card explore-card"
            onClick={() => navigate("/explore")}
          >
            <div className="icon">📚</div>

            <h3>Explore Books</h3>

            <p>
              Browse motivation, success,
              finance and inspiring books.
            </p>
          </div>

          <div
            className="card favorite-card"
            onClick={() => navigate("/explore")}
          >
            <div className="icon">⭐</div>

            <h3>Save Favorites</h3>

            <p>
              Save your favorite books and
              access them anytime.
            </p>
          </div>

          <div
            className="card grow-card"
            onClick={() => navigate("/explore")}
          >
            <div className="icon">🔥</div>

            <h3>Grow Daily</h3>

            <p>
              Create a daily reading habit
              and improve continuously.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="quote">
          📖 One Book Can Change Your Life
        </div>
      </div>
    </div>
  );
}

export default Home;