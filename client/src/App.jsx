import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./actions/user";

// Import components
import SimpleBackdrop from "./components/SimpleBackdrop";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Import styles
import "./App.css";
import SetAvatarPage from "./pages/SetAvatarPage/SetAvatarPage";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  // get user data
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUser(setLoading));
    };
    fetchData();
  }, [dispatch]);

  return isLoading ? (
    <SimpleBackdrop />
  ) : (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute auth={isLoggedIn} navigate="/login">
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/setavatar"
          element={
            <ProtectedRoute auth={isLoggedIn} navigate="/login">
              <SetAvatarPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute auth={!isLoggedIn} navigate="/">
              <RegisterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRoute auth={!isLoggedIn} navigate="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
