import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/Table";
import { DashboardContext } from "../contexts/DashboardContext";
import Swal from "sweetalert2";
import Pagination from "../components/Pagination";
import "../pagination.css";

const roleOptions = ["admin", "dps", "support", "healer", "tanker", "subdps"];

const Users = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: { name: "", email: "", role: "", id: null },
  });

  // **Key di localStorage sekarang 'users' sehingga tidak bentrok dengan session-login**
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("users");
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const { setTotalUser, addLog } = useContext(DashboardContext);

  const onSubmit = (data) => {
    if (data.id) {
      setUsers(users.map((u) => (u.id === data.id ? data : u)));
      addLog(`Updated User: ${data.name}`);
      Swal.fire("Updated", "User has been updated.", "success");
    } else {
      const newUser = { ...data, id: Date.now() };
      setUsers([...users, newUser]);
      addLog(`Added User: ${newUser.name}`);
      Swal.fire("Added", "New user has been added.", "success");
    }
    reset({ name: "", email: "", role: "", id: null });
  };

  const handleDelete = (id) => {
    const deletedUser = users.find((u) => u.id === id);
    setUsers(users.filter((u) => u.id !== id));
    if (deletedUser) addLog(`Deleted User: ${deletedUser.name}`);
  };

  const handleEdit = (u) => {
    Object.keys(u).forEach((k) => setValue(k, u[k]));
    addLog(`Editing User: ${u.name}`);
  };

  const search = watch("searchTerm") || "";
  const filterRole = watch("filterRole") || "all";

  const filtered = users
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => (filterRole === "all" ? true : u.role === filterRole));

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  const currentItems = filtered.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    setTotalUser(users.length);
  }, [users]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-semibold text-center">User Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-5">
        <div className="flex flex-wrap items-center gap-4">
          <input
            {...register("name", { required: "Name is required" })}
            className="flex-1 min-w-[200px] border-gray-300 rounded px-3 py-2 border focus:ring-2 focus:ring-blue-400"
            placeholder="Name"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email",
              },
            })}
            className="flex-1 min-w-[200px] border-gray-300 rounded px-3 py-2 border focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <select
            {...register("role", { required: "Role is required" })}
            className="border-gray-300 rounded px-3 py-2 border focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>Select Role</option>
            {roleOptions.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
          {errors.role && <span className="text-red-500">{errors.role.message}</span>}

          <input type="hidden" {...register("id")} />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            {watch("id") ? "Update" : "Add"} User
          </button>
        </div>
      </form>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <input
          {...register("searchTerm")}
          type="text"
          className="flex-1 min-w-[200px] border-gray-300 rounded px-3 py-2 border focus:ring-2 focus:ring-blue-400"
          placeholder="Search by name or email..."
        />
        <select
          {...register("filterRole")}
          className="border-gray-300 rounded px-3 py-2 border focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Roles</option>
          {roleOptions.map((r) => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
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
          fields={["name", "email", "role"]}
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
}
export default Users;
