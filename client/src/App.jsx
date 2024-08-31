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
import useUserStore from "../library/zustand"; 


function ProtectedRoute({ children }) {
  const { isLoggedIn } = useUserStore(); 
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedIsLoggedIn = localStorage.getItem("user-storage");
      if (storedIsLoggedIn) {
        const parsedData = JSON.parse(storedIsLoggedIn);
        if (parsedData.state.isLoggedIn) {
          setIsInitialized(true); 
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
    return null;
  }

  return children; 
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
