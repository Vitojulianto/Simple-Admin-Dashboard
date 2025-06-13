import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/Table";
import { DashboardContext } from "../contexts/DashboardContext";
import Swal from "sweetalert2";
import Pagination from "../components/Pagination";
import "../pagination.css";

const categoryOptions = ["figure", "keychain", "t-shirt"];

const Products = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", price: "", image: "", category: "", id: null },
  });

  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const { setTotalProduct, addLog } = useContext(DashboardContext);

  const onSubmit = (data) => {
    if (data.id) {
      setProducts(products.map((p) => (p.id === data.id ? data : p)));
      addLog(`Updated Product: ${data.name}`);
      Swal.fire("Updated", "Product has been updated.", "success");
    } else {
      const newProduct = { ...data, id: Date.now() };
      setProducts([...products, newProduct]);
      addLog(`Added Product: ${newProduct.name}`);
      Swal.fire("Added", "New product has been added.", "success");
    }
    reset({ name: "", price: "", image: "", category: "", id: null });
  };

  const handleDelete = (id) => {
    const deleted = products.find((p) => p.id === id);
    setProducts(products.filter((p) => p.id !== id));
    if (deleted) addLog(`Deleted Product: ${deleted.name}`);
  };

  const handleEdit = (p) => {
    Object.keys(p).forEach((k) => setValue(k, p[k]));
    addLog(`Editing Product: ${p.name}`);
  };

  const search = watch("searchTerm") || "";
  const filterCategory = watch("filterCategory") || "all";
  const priceRange = watch("priceRange") || "all";

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => {
      const priceStr = String(p.price).replace(/\./g, "");
      const price = parseInt(priceStr, 10) || 0;
      if (priceRange === "low") return price < 100000;
      if (priceRange === "medium") return price >= 100000 && price <= 500000;
      if (priceRange === "high") return price > 500000;
      return true;
    })
    .filter((p) => (filterCategory === "all" ? true : p.category === filterCategory));

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const currentItems = filtered.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    setTotalProduct(products.length);
  }, [products]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-semibold text-center text-white">Product Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-wrap items-center gap-4">
          <input
            {...register("name", { required: "Name is required" })}
            className="flex-1 min-w-[180px] border-gray-300 rounded px-3 py-2 border"
            placeholder="Name"
          />
          <input
            {...register("price", { required: "Price is required" })}
            className="flex-1 min-w-[120px] border-gray-300 rounded px-3 py-2 border"
            placeholder="Price"
          />
          <input
            {...register("image")}
            className="flex-1 min-w-[180px] border-gray-300 rounded px-3 py-2 border"
            placeholder="Image URL"
          />
          <select
            {...register("category", { required: "Category is required" })}
            className="border-gray-300 rounded px-3 py-2 border"
          >
            <option value="" disabled>Category</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
          <input type="hidden" {...register("id")} />
          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded">
            {watch("id") ? "Update" : "Add"} Product
          </button>
        </div>
      </form>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <input
          {...register("searchTerm")}
          className="flex-1 min-w-[200px] border-gray-300 rounded px-3 py-2 border text-black bg-white"
          placeholder="Search by name..."
        />
        <select {...register("priceRange")} className="border-gray-300 rounded px-3 py-2 border">
          <option value="all">All Prices</option>
          <option value="low">Below 100.000</option>
          <option value="medium">100.000–500.000</option>
          <option value="high">Above 500.000</option>
        </select>
        <select
          {...register("filterCategory")}
          className="border-gray-300 rounded px-3 py-2 border"
        >
          <option value="all">All Categories</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
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
          fields={["name", "price", "image", "category"]}
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

export default Products;
