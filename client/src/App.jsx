import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LoanUser from "./loanUser";
import UserDetailsLoan from "./UserDetailsLoan";
import UserDetailsDeposit from "./UserDetailsDeposit";
import MainPage from "./mainPage";
import LoginPage from "./loginPage";
import useUserStore from "../library/zustand"; // Import Zustand store

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useUserStore(); // Zustand state
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedIsLoggedIn = localStorage.getItem("user-storage");
      if (storedIsLoggedIn) {
        const parsedData = JSON.parse(storedIsLoggedIn);
        if (parsedData.state.isLoggedIn) {
          setIsInitialized(true); // Mark as initialized only if user is logged in
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  if (!isInitialized) {
    return null; // Or a loading spinner, if necessary
  }

  return children; // Render the children if logged in
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="/userLoan/:id" element={<UserDetailsLoan />} />
        <Route path="/userDeposit/:id" element={<UserDetailsDeposit />} />
      </Routes>
    </Router>
  );
}

export default App;
