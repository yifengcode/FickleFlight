import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import HotelsPage from "./components/HotelsPage";
import ResultsPage from "./components/ResultsPage";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "FickleFlight - Flight Search";
        metaDescription = "Search and book flights with FickleFlight";
        break;
      case "/homepage":
        title = "FickleFlight - Home";
        metaDescription = "FickleFlight homepage";
        break;
      case "/hotels-page":
        title = "FickleFlight - Hotels";
        metaDescription = "Find and book hotels with FickleFlight";
        break;
      case "/results":
        title = "FickleFlight - Search Results";
        metaDescription = "Flight search results";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<ResultsPage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/hotels-page" element={<HotelsPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
}
export default App;
