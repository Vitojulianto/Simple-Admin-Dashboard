import React from "react";


const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 text-black dark:text-white shadow">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 dark:text-gray-300">Welcome, Admin</span>
        
      </div>
    </header>
  );
};

export default Header;
