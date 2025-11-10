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
    // Early return if pathname is root - no title/meta changes needed
    if (pathname === "/") {
      return;
    }

    let title = "";
    let metaDescription = "";

    // Future routes can be added here
    // switch (pathname) {
    //   case "/other-route":
    //     title = "Other Route";
    //     metaDescription = "Description";
    //     break;
    // }

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
      <Route path="/hotels-page" element={<HotelsPage />} />
      <Route path="/results-page" element={<ResultsPage search="Search" />} />
    </Routes>
  );
}
export default App;
