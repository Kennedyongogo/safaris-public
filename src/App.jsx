import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
import { theme } from "./theme";
import "./App.css";
import React, { useState, useEffect, Suspense, lazy } from "react";
import PublicHeader from "./components/Header/PublicHeader";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const TeamMemberDetail = lazy(() => import("./pages/TeamMemberDetail"));
const Team = lazy(() => import("./pages/Team"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Plan = lazy(() => import("./pages/Plan"));
const DestinationDetails = lazy(() => import("./pages/DestinationDetails"));
const Destinations = lazy(() => import("./pages/Destinations"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PrivateRoute({ user, children }) {
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }
  return children;
}

function App() {
  const [user, setUser] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(true); // Drawer open by default

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "white",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <>
                  <PublicHeader />
                  <Home />
                </>
              }
            />
            <Route
              path="/team"
              element={
                <>
                  <PublicHeader />
                  <Team />
                  <Footer />
                </>
              }
            />
            <Route
              path="/team/:id"
              element={
                <>
                  <PublicHeader />
                  <TeamMemberDetail />
                  <Footer />
                </>
              }
            />
            <Route
              path="/reviews"
              element={
                <>
                  <PublicHeader />
                  <Reviews />
                  <Footer />
                </>
              }
            />
            <Route
              path="/plan"
              element={
                <>
                  <PublicHeader />
                  <Plan />
                  <Footer />
                </>
              }
            />
            <Route
              path="/destinations"
              element={
                <>
                  <PublicHeader />
                  <Destinations />
                  <Footer />
                </>
              }
            />
            <Route
              path="/destination/:id"
              element={
                <>
                  <PublicHeader />
                  <DestinationDetails />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Suspense>
        <Chatbot />
      </Router>
    </ThemeProvider>
  );
}

export default App;
