import { Route, Routes, Navigate } from "react-router-dom";

import { HomePage, LoginPage, RegisterPage } from "../pages";
import { useSelector } from "react-redux";
const Router = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default Router;
