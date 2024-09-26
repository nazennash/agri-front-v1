import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import Cookies from "js-cookie";
import { FaUserCircle, FaBell, FaExchangeAlt } from "react-icons/fa";
import { BiLogOut, BiEditAlt, BiTrash, BiCamera } from "react-icons/bi";
import { MdDashboard, MdReport } from "react-icons/md";
import { GiRobotLeg } from "react-icons/gi";
import { CgEreader, CgProductHunt } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem("activeSection") || "Dashboard";
  });

  const user = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  const renderContent = (sectionTitle, description) => (
    <div className="bg-white shadow-md rounded-lg mt-4 p-6">
      <h2 className="text-lg font-bold">{sectionTitle}</h2>
      <p>{description}</p>
    </div>
  );

  const renderRoleBasedContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return renderContent("Dashboard", "Welcome to your dashboard.");
      case "Role Management":
        return renderContent(
          "Role Management",
          "Manage roles and permissions."
        );
      case "Users":
        return renderContent("Users", "Manage users and their access.");
      case "Products":
        return renderContent(
          "Products",
          "Manage product details and inventory."
        );
      case "Product Passports":
        return renderContent(
          "Product Passports",
          "View and manage product passports."
        );
      case "Reports":
        return renderContent("Reports", "Generate and review reports.");
      case "Credentials":
        return renderContent(
          "Credentials",
          "Manage user credentials and security."
        );
      case "Data Exchange":
        return renderContent(
          "Data Exchange",
          "Oversee data exchange between systems."
        );
      case "Settings":
        return renderContent("Settings", "Adjust your system settings.");
      default:
        return renderContent("Dashboard", "Welcome to your dashboard.");
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard className="mr-2" />,
      section: "Dashboard",
    },
    {
      name: "Role Management",
      icon: <GiRobotLeg className="mr-2" />,
      section: "Role Management",
    },
    { name: "Users", icon: <GrGroup className="mr-2" />, section: "Users" },
    {
      name: "Products",
      icon: <CgProductHunt className="mr-2" />,
      section: "Products",
    },
    {
      name: "Product Passports",
      icon: <BiCamera className="mr-2" />,
      section: "Product Passports",
    },
    {
      name: "Reports",
      icon: <MdReport className="mr-2" />,
      section: "Reports",
    },
    {
      name: "Credentials",
      icon: <CgEreader className="mr-2" />,
      section: "Credentials",
    },
    {
      name: "Data Exchange",
      icon: <FaExchangeAlt className="mr-2" />,
      section: "Data Exchange",
    },
    {
      name: "Settings",
      icon: <CiSettings className="mr-2" />,
      section: "Settings",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold m-5">Logo</h2>
        </div>
        <ul className="mt-5 m-5">
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActiveSection(item.section)}
              className={`mb-5 p-3 hover:bg-blue-500 hover:text-white hover:rounded-md cursor-pointer ${
                activeSection === item.section
                  ? "bg-blue-500 text-white rounded-md"
                  : ""
              }`}
            >
              <div className="flex items-center">
                {item.icon} {item.name}
              </div>
            </li>
          ))}
          <li className="mb-5 p-3 hover:bg-blue-500 hover:text-white hover:rounded-md bottom-0 absolute cursor-pointer">
            <button
              onClick={handleLogout}
              className="text-red-500 flex items-center"
            >
              <BiLogOut className="mr-2" /> Sign Out
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Top Bar */}
        <header className="flex justify-between items-center bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold">{activeSection}</h1>
          <div className="flex items-center">
            <FaBell className="mr-6 text-gray-600" />
            <div className="flex items-center">
              <FaUserCircle className="mr-2 text-gray-600" />
              <span className="mr-2 font-semibold">{user?.name}</span>
              <span className="text-gray-500">{user?.role}</span>
            </div>
          </div>
        </header>

        {renderRoleBasedContent()}
      </div>
    </div>
  );
};

export default Dashboard;
