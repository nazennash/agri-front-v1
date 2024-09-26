import React, { useState, useEffect } from "react";
import { loginUser, getUserDetails } from "../api/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await getUserDetails();
        const user = response.data.userdetails.name;
        const role = response.data.userdetails.role;
        if (user && role) {
          switch (role) {
            case "Admin":
              navigate("/admin");
              break;
            case "Consumer":
              navigate("/customer");
              break;
            case "Producer":
              navigate("/producer");
              break;
            case "Distributor":
              navigate("/distributor");
              break;
            case "Regulator":
              navigate("/regulator");
              break;
            default:
              navigate("/");
          }
        }
      } catch (error) {
        console.error("User not logged in:", error);
      }
    };

    checkUserLoggedIn();

    // Check for token in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      Cookies.set("authToken", token, { expires: 1 }); // Store token in cookie
      navigate("/"); // Redirect to home or appropriate dashboard
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const token = response.data.token; // Adjust based on your API response structure
      Cookies.set("authToken", token, { expires: 1 }); // Store token in cookie
      const user = response.data.userdetails.name;
      const role = response.data.userdetails.role;
      if (user && role) {
        switch (role) {
          case "Admin":
            navigate("/admin");
            break;
          case "Consumer":
            navigate("/customer");
            break;
          case "Producer":
            navigate("/producer");
            break;
          case "Distributor":
            navigate("/distributor");
            break;
          case "Regulator":
            navigate("/regulator");
            break;
          default:
            navigate("/");
        }
      } else {
        alert("User role not found.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed!");
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self"); // Redirect to Google OAuth
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
