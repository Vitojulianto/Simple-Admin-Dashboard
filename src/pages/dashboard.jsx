import React, { useContext } from "react";
import { DashboardContext } from "../contexts/DashboardContext";

const Dashboard = () => {
  const {totalUser, totalProduct, totalCustomer} = useContext(DashboardContext)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Users</p>
          <h3 className="text-2xl font-bold">{totalUser}</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Products</p>
          <h3 className="text-2xl font-bold">{totalProduct}</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Customers</p>
          <h3 className="text-2xl font-bold">{totalCustomer}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
