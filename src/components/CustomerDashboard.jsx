import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getProducts, createProduct, deleteProduct } from "../api/api"; // Ensure these are imported

const CustomerDashboard = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [newProduct, setNewProduct] = useState({
    name: "",
    customer: "",
    date: "",
    amount: "",
  });

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data || []); // Ensure it defaults to an empty array
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Ensure products is an empty array on error
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({ name: "", customer: "", date: "", amount: "" }); // Reset the form
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <div className="flex items-center">
          <span className="text-lg font-semibold">Logo</span>
        </div>
        <div className="flex items-center">
          <span className="mr-4">{user?.name}</span>
          <span className="text-gray-500">{user?.role}</span>
        </div>
      </header>

      <div className="flex flex-1">
        <nav className="w-64 bg-gray-100 p-4">
          <ul>
            <li className="mb-2 p-4">
              <a href="#" className="text-blue-500">
                Dashboard
              </a>
            </li>
            <li className="mb-2 p-4">
              <a href="#" className="text-gray-700">
                Role Management
              </a>
            </li>
            <li className="mb-2 p-4">
              <a href="#" className="text-gray-700">
                Users
              </a>
            </li>
            <li className="mb-2 p-4">
              <a href="#" className="text-gray-700">
                Products
              </a>
            </li>
            <li className="mb-2 p-4">
              <a href="#" className="text-gray-700">
                Product Passports
              </a>
            </li>
            <li className="mb-2 p-4">
              <a href="#" className="text-gray-700">
                Reports
              </a>
            </li>
            <li className="mb-2 p-4">
              <a href="#" className="text-gray-700">
                Credentials
              </a>
            </li>
            <li className="mb-2 p-4">
              <a href="#" className="text-gray-700">
                Data Exchange
              </a>
            </li>
            <li className="mb-2 p-4">
              <a href="#" className="text-gray-700">
                Settings
              </a>
            </li>
            <li className="mb-2 p-4">
              <button onClick={handleLogout} className="text-red-500">
                Sign Out
              </button>
            </li>
          </ul>
        </nav>

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          {user && (
            <div className="mb-4">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          )}
          <form onSubmit={handleAddProduct} className="mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Customer Name"
              value={newProduct.customer}
              onChange={(e) =>
                setNewProduct({ ...newProduct, customer: e.target.value })
              }
              required
              className="border p-2 mb-2"
            />
            <input
              type="date"
              placeholder="Date"
              value={newProduct.date}
              onChange={(e) =>
                setNewProduct({ ...newProduct, date: e.target.value })
              }
              required
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Amount"
              value={newProduct.amount}
              onChange={(e) =>
                setNewProduct({ ...newProduct, amount: e.target.value })
              }
              required
              className="border p-2 mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </form>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Product</th>
                  <th className="py-2 px-4 border-b">Customer</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) &&
                  products.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-4 border-b">{item.id}</td>
                      <td className="py-2 px-4 border-b">{item.product}</td>
                      <td className="py-2 px-4 border-b">{item.customer}</td>
                      <td className="py-2 px-4 border-b">{item.date}</td>
                      <td className="py-2 px-4 border-b">{item.amount}</td>
                      <td className="py-2 px-4 border-b">
                        <button className="text-blue-500 hover:underline">
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:underline ml-2"
                          onClick={() => handleDeleteProduct(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
