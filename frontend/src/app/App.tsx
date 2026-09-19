import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import ProjectPage from "../pages/Project/ProjectPage";
import NotFound from "../pages/NotFound/NotFound";
import ScrollToTop from "../components/ui/ScrollToTop";

import { initLenis, destroyLenis } from "../lib/lenis/lenis";

function AppContent() {
  useEffect(() => {
    initLenis();

    return () => {
      destroyLenis();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/:projectId" element={<ProjectPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;