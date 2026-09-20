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

    // Silently pre-warm the backend so cold-starts happen in the background
    const rawApiUrl =
      (import.meta.env.VITE_API_URL as string | undefined) ||
      "http://localhost:5000/api";
    const cleanBaseUrl = rawApiUrl.replace(/\/+$/, "");
    const healthUrl = cleanBaseUrl.endsWith("/api")
      ? `${cleanBaseUrl}/health`
      : `${cleanBaseUrl}/api/health`;

    fetch(healthUrl, { mode: "cors" }).catch(() => {});

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