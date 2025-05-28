// src/App.jsx
import React from "react";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Products from "./pages/products";
import Customers from "./pages/customers";
import CalendarPage from "./pages/calender";


function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4">
            <Routes>
              
              <Route
                path="/"
                element={
                  
                    <Dashboard />
                  
                }
              />
              <Route
                path="/users"
                element={
                  
                    <Users />
                  
                }
              />
              <Route
                path="/products"
                element={
                  
                    <Products />
                  
                }
                
              /><Route
                path="/customers"
                element={
                  
                    <Customers />
                  
                }
                
              /><Route
                path="/calender"
                element={
                  
                    <CalendarPage />
                  
                }
                
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
