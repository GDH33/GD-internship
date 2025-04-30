import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

    function App() {
      return (
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/author" element={<Author />} />
            <Route path="/author/:authorId" element={<Author />} />
            <Route path="/item-details/:nftId" element={<ItemDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </Router>
  );
}

export default App;
