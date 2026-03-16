import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoutes from "./guards/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/onboarding"
        element={
          <ProtectedRoutes>
            <OnboardingPage />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default App;
