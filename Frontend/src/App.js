import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />

        {/* ✅ ADD THIS */}
        <Route path="/book-details" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;