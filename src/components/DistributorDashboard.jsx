import React from "react";
import { useUser } from "./UserContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const DistributorDashboard = () => {
  const user = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  return (
    <div>
      <h1>Distributor Dashboard</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DistributorDashboard;
