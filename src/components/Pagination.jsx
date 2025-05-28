// src/components/Pagination.jsx
import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected)}
      containerClassName={"flex gap-2 justify-center mt-4"}
      pageClassName={"px-3 py-1 border rounded hover:bg-blue-100"}
      activeClassName={"bg-blue-500 text-white"}
      previousClassName={"px-3 py-1 border rounded"}
      nextClassName={"px-3 py-1 border rounded"}
      breakClassName={"px-3 py-1"}
    />
  );
};

export default Pagination;
