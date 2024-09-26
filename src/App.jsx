import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ProducerDashboard from "./components/ProducerDashboard";
import RegulatorDashboard from "./components/RegulatorDashboard";
import DistributorDashboard from "./components/DistributorDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/producer" element={<ProducerDashboard />} />
            <Route path="/regulator" element={<RegulatorDashboard />} />
            <Route path="/distributor" element={<DistributorDashboard />} />
            <Route path="/customer" element={<CustomerDashboard />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
