import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import ResultsPage from "./components/ResultsPage";
import HotelsPage from "./components/HotelsPage";

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
        title = "FickleFlight - Homepage";
        metaDescription = "Find the best flights and travel deals";
        break;
      case "/results":
        title = "FickleFlight - Search Results";
        metaDescription = "Flight search results";
        break;
      case "/hotels-page":
        title = "FickleFlight - Hotels";
        metaDescription = "Find the best hotels";
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
      <Route path="/" element={<Homepage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/hotels-page" element={<HotelsPage />} />
    </Routes>
  );
}
export default App;
