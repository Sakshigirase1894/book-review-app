import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Explore.css";

function Explore() {
  const navigate = useNavigate();

  const [booksData, setBooksData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Fetch Books

  // Fetch Books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://book-review-app-1-b9ch.onrender.com/api/books?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        console.log("Books API data:", data);

        // API array किंवा object मधील books array हाताळतो
        const books = Array.isArray(data)
          ? data
          : Array.isArray(data.books)
          ? data.books
          : [];

        console.log("Books Count:", books.length);
        setBooksData(books);
      } catch (error) {
        console.error("Fetch Books Error:", error);
        setBooksData([]);
      }
    };

    fetchBooks();
  }, []);

  // Favorite Save Remove
  const saveBook = (book) => {
    const exists = favorites.some((b) => b._id === book._id);

    let updated;
    if (exists) {
      updated = favorites.filter((b) => b._id !== book._id);
    } else {
      updated = [...favorites, book];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Filter
  let filteredBooks =
    selectedCategory === "all"
      ? booksData
      : selectedCategory === "favorites"
      ? favorites
      : booksData.filter((book) => book.category === selectedCategory);

  filteredBooks = filteredBooks.filter((book) => {
    const text = search.toLowerCase();
    return (
      book.title?.toLowerCase().includes(text) ||
      book.author?.toLowerCase().includes(text) ||
      book.category?.toLowerCase().includes(text)
    );
  });

  const favoriteIds = new Set(favorites.map((b) => b._id));

  return (
    <div className={`explore ${darkMode ? "dark" : "light"}`}>
      {/* HEADER */}
      <div className="exploreHeader">
        <h1>📚 Explore Books</h1>
        <div className="headerBtns">
          <button
            className="themeBtn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button className="homeBtn" onClick={() => navigate("/")}>
            🏠 Home
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <input
        className="searchBar"
        type="text"
        placeholder="🔍 Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CATEGORY */}
      <div className="categoryBar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* BOOK GRID */}
      <div className="grid">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="card"
            onClick={() =>
              navigate("/book-details", {
                state: book,
              })
            }
          >
            <div className="imgBox">
              <img
                src={
                  book.image ||
                  "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
                }
                alt={book.title}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
                }}
              />

              {/* Favorite Icon */}
              <div
                className={`saveIcon ${
                  favoriteIds.has(book._id) ? "saved" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  saveBook(book);
                }}
              >
                ♥
              </div>
            </div>

            <div className="cardBody">
              <h3>{book.title}</h3>
              <p>✍ {book.author}</p>
              <p>📖 {book.category}</p>
              <p>⭐ {book.rating || 4.5}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
