import { useState, useEffect, lazy, Suspense } from "react";
import "./index.css";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import SpaceBackground from "./components/SpaceBackground";

const LazyHomePage = lazy(() => import("./pages/HomePage"));
const LazyAPODPage = lazy(() => import("./pages/APODPage"));
const LazyMarsRoverPage = lazy(() => import("./pages/MarsRoverPage"));
const LazyAboutPage = lazy(() => import("./pages/About"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SpaceBackground>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-24">
              <Suspense
                fallback={
                  <div className="text-center p-8 text-white">
                    Loading Page...
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<LazyHomePage />} />
                  <Route path="/apod" element={<LazyAPODPage />} />
                  <Route path="/mars-rover" element={<LazyMarsRoverPage />} />
                  <Route path="/about" element={<LazyAboutPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </SpaceBackground>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
