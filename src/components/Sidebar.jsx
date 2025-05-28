import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow h-full p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/users" className="text-gray-700 hover:text-blue-600">Users</Link>
        <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
        <Link to="/customers" className="text-gray-700 hover:text-blue-600">Customers</Link>
        <Link to="/calender" className="text-gray-700 hover:text-blue-600">Calender</Link>
        {/* Tambahkan link lainnya nanti */}
      </nav>
    </aside>
  );
};

export default Sidebar;
