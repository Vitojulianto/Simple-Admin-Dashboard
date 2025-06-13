import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/Table";
import { DashboardContext } from "../contexts/DashboardContext";
import Swal from "sweetalert2";
import Pagination from "../components/Pagination";
import "../pagination.css";

const genderOptions = ["male", "female"];

const Customers = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", country: "", gender: "", id: null },
  });

  const [customers, setCustomers] = useState(() => {
    const stored = localStorage.getItem("customers");
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const { setTotalCustomer, addLog } = useContext(DashboardContext);

  const onSubmit = (data) => {
    if (data.id) {
      setCustomers(customers.map((c) => (c.id === data.id ? data : c)));
      addLog(`Updated Customer: ${data.name}`);
      Swal.fire("Updated", "Customer has been updated.", "success");
    } else {
      const newCustomer = { ...data, id: Date.now() };
      setCustomers([...customers, newCustomer]);
      addLog(`Added Customer: ${newCustomer.name}`);
      Swal.fire("Added", "New customer has been added.", "success");
    }
    reset({ name: "", email: "", country: "", gender: "", id: null });
  };

  const handleDelete = (id) => {
    const deleted = customers.find((c) => c.id === id);
    setCustomers(customers.filter((c) => c.id !== id));
    if (deleted) addLog(`Deleted Customer: ${deleted.name}`);
  };

  const handleEdit = (c) => {
    Object.keys(c).forEach((k) => setValue(k, c[k]));
    addLog(`Editing Customer: ${c.name}`);
  };

  const search = watch("searchTerm") || "";
  const filterGender = watch("filterGender") || "all";

  const filtered = customers
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) => (filterGender === "all" ? true : c.gender === filterGender));

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const currentItems = filtered.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
    setTotalCustomer(customers.length);
  }, [customers]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-black">
      <h2 className="text-3xl font-semibold text-center text-white">Customer Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-5">
        <div className="flex flex-wrap items-center gap-4">
          <input
            {...register("name", { required: "Name is required" })}
            className="flex-1 min-w-[180px] border-gray-300 rounded px-3 py-2 border"
            placeholder="Name"
          />
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email",
              },
            })}
            className="flex-1 min-w-[200px] border-gray-300 rounded px-3 py-2 border"
            placeholder="Email"
          />
          <input
            {...register("country")}
            className="flex-1 min-w-[160px] border-gray-300 rounded px-3 py-2 border"
            placeholder="Country"
          />
          <select
            {...register("gender", { required: "Gender is required" })}
            className="border-gray-300 rounded px-3 py-2 border"
          >
            <option value="" disabled>Gender</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </option>
            ))}
          </select>
          <input type="hidden" {...register("id")} />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            {watch("id") ? "Update" : "Add"} Customer
          </button>
        </div>
      </form>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-4">
        <input
          {...register("searchTerm")}
          type="text"
          className="flex-1 min-w-[200px] border-gray-300 rounded px-3 py-2 border text-black bg-white"
          placeholder="Search by name or email..."
        />
        <select
          {...register("filterGender")}
          className="border-gray-300 rounded px-3 py-2 border"
        >
          <option value="all">All Genders</option>
          {genderOptions.map((g) => (
            <option key={g} value={g}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Table
          data={currentItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
          fields={["name", "email", "country", "gender"]}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Customers;
