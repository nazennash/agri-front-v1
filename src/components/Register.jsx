import React, { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate(); // For navigation after registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      setSuccessMessage("Successfully registered! Redirecting to login..."); // Set success message
      setTimeout(() => {
        navigate("/login"); // Redirect to login after a short delay
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 mb-4 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 mb-4 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 mb-4 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded mb-4"
          >
            Register
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
