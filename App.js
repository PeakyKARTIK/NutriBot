// File: Nutrihelp-web/src/App.js
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { initializeFontSize } from "./utils/fontSizeManager";
import { UserContext } from "./context/user.context";
import AuthenticateRoute from "./routes/AuthenticateRoute/AuthenticateRoute";
import MainNavbar from "./components/MainNavbar";

// ===== Auth Pages =====
import Login from "./routes/Login/Login";
import SignUp from "./routes/SignUp/SignUp";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword";

// ===== Public Pages =====
import Home from "./routes/Home/Home";
import FAQ from "./routes/FAQ/faq";
import FoodPreferences from "./routes/FoodPreferences/FoodPreferences";

// ===== Protected Pages =====
import CreateRecipe from "./routes/CreateRecipe/CreateRecipe";
import SearchRecipes from "./routes/SearchRecipes/SearchRecipes";
import CategoryResults from "./routes/SearchRecipes/CategoryResults";
import YourPreferences from "./routes/UI-Only-Pages/YourPreferences/pref-dis-health";
import UserProfilePage from "./routes/UI-Only-Pages/UserProfilePage/userprofile";
import DietaryRequirements from "./routes/UI-Only-Pages/DietaryRequirements/DietaryRequirements";
import ScanProducts from "./routes/UI-Only-Pages/ScanProducts/ScanProducts";
import Menu from "./routes/UI-Only-Pages/Menu/Menu";
import Recipe from "./components/Recipe";
import Appointment from "./routes/UI-Only-Pages/Appointment/Appointment";
import Meal from "./routes/Meal/Meal";
import MFAform from "./routes/MFA/MFAform";
import Dashboard from "./routes/NewMenu/Dashboard";
import NutritionCalculator from "./routes/UI-Only-Pages/NutritionCalculator/NutritionCalculator";
import HealthNews from "./routes/HealthNews/HealthNews";
import HealthTools from "./routes/HealthTools/HealthTools";
import RecipeRating from "./routes/RecipeRating/RecipeRating";
import Settings from "./routes/Settings/Settings";

// ===== Constants =====
const DEVELOPMENT_MODE = true; // Toggle to false for production
const AUTH_HIDDEN_PATHS = ["/login", "/signup", "/forgotpassword"];

function AppContent() {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  // Accessibility: set font size according to saved preference
  useEffect(() => {
    initializeFontSize();
  }, []);

  // Decide when to show the navbar
  const shouldShowNavbar = !AUTH_HIDDEN_PATHS.includes(
    location.pathname.toLowerCase()
  );

  // Small helper to reduce repetition for protected routes
  const Protected = (Component) => (
    <AuthenticateRoute>{Component}</AuthenticateRoute>
  );

  return (
    <>
      {shouldShowNavbar && <MainNavbar />}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Root redirect logic */}
        <Route
          path="/"
          element={
            DEVELOPMENT_MODE
              ? <Navigate to="/home" />
              : currentUser
                ? <Navigate to="/home" />
                : <Navigate to="/login" />
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/preferences" element={<FoodPreferences />} />

        {/* Protected routes */}
        <Route path="/createrecipe" element={Protected(<CreateRecipe />)} />
        <Route path="/searchrecipes" element={Protected(<SearchRecipes />)} />
        <Route path="/searchrecipes/:category" element={Protected(<CategoryResults />)} />
        <Route path="/yourpreferences" element={Protected(<YourPreferences />)} />
        <Route path="/userprofile" element={Protected(<UserProfilePage />)} />
        <Route path="/appointment" element={Protected(<Appointment />)} />
        <Route path="/dietaryrequirements" element={Protected(<DietaryRequirements />)} />
        <Route path="/scanproducts" element={Protected(<ScanProducts />)} />
        <Route path="/reciperating" element={Protected(<RecipeRating />)} />
        <Route path="/menu" element={Protected(<Menu />)} />
        <Route path="/recipe/:id" element={Protected(<Recipe />)} />
        <Route path="/meal" element={Protected(<Meal />)} />
        <Route path="/nutrition-calculator" element={Protected(<NutritionCalculator />)} />
        <Route path="/healthnews" element={Protected(<HealthNews />)} />
        <Route path="/mfaform" element={Protected(<MFAform />)} />
        <Route path="/dashboard" element={Protected(<Dashboard />)} />
        <Route path="/healthtools" element={Protected(<HealthTools />)} />
        <Route path="/settings" element={Protected(<Settings />)} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
