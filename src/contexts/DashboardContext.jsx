import React, { createContext, useEffect, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [totalUser, setTotalUser] = useState(() => {
    const saved = localStorage.getItem("totalUser");
    return saved ? JSON.parse(saved) : 0;
  });

  const [totalProduct, setTotalProduct] = useState(() => {
    const saved = localStorage.getItem("totalProduct");
    return saved ? JSON.parse(saved) : 0;
  });

  const [totalCustomer, setTotalCustomer] = useState(() => {
    const saved = localStorage.getItem("totalCustomer");
    return saved ? JSON.parse(saved) : 0;
  });

  // Simpan ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("totalUser", JSON.stringify(totalUser));
  }, [totalUser]);

  useEffect(() => {
    localStorage.setItem("totalProduct", JSON.stringify(totalProduct));
  }, [totalProduct]);

  useEffect(() => {
    localStorage.setItem("totalCustomer", JSON.stringify(totalCustomer));
  }, [totalCustomer]);

  const [logs, setLogs] = useState(()=>{
    const stored = localStorage.getItem("logs");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  const addLog = (type) => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const message = `${type}`;
  setLogs(prev => [...prev, { message, date }]);
};


  return (
    <DashboardContext.Provider
      value={{
        totalUser,
        setTotalUser,
        totalProduct,
        setTotalProduct,
        totalCustomer,
        setTotalCustomer,
        logs,
        addLog,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
