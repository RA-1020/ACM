import React, { useState, useEffect } from "react";
import LoginForm from "./form/form";
import LoadingScreen from "./components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import './App.css'

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.errors[0].msg);
        return;
      }

      const { accountType, authtoken } = data;
      localStorage.setItem("authToken", authtoken);

      const routes = {
        employee: "/Employee",
        "Department Head": "/Department",
        owner: "/Owner"
      };

      navigate(routes[accountType]);
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="form">
        <div className="ambient-bg" />
        <div className="temp">
          <LoginForm handleLogin={handleLogin} />
          {error && (
            <div className="error">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
