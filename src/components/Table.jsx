import Swal from "sweetalert2";

const Table = ({ data, onEdit, onDelete, fields }) => {
  // Handler konfirmasi delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The data that has been deleted cannot be restored!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire("Deleted!", "Data has been deleted.", "success");
      }
    });
  };

  // Handler konfirmasi edit
  const handleEditConfirm = (item) => {
    Swal.fire({
      title: "Edit this entry?",
      text: "Do you want to edit this record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, edit!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        onEdit(item);
        Swal.fire("Editing", "You can now update the data.", "info");
      }
    });
  };

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100 text-left">
          {fields.map((field) => (
            <th key={field} className="p-2 capitalize">
              {field}
            </th>
          ))}
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-t">
            {fields.map((field) => (
              <td key={field} className="p-2">
                {field === "image" ? (
                  <img
                    src={item[field]}
                    alt={item.name || "image"}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : field === "price" ? (
                  Number(item[field]).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR"
                  })
                ) : (
                  item[field]
                )}
              </td>
            ))}
            <td className="p-2">
              <button
                onClick={() => handleEditConfirm(item)}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;