import React from "react";

const DeleteStockModal = ({ show, stockId, onClose, onDelete }) => {
  console.log("🗑️ Delete Modal Rendered", { show, stockId });

  if (!show || stockId === null) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-[#ed1c24]">Confirm Delete</h2>
        <p className="mb-6 text-gray-700">Are you sure you want to delete this stock?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border"
          >
            Cancel
          </button>
          <button
  onClick={() => {
    console.log("🧨 Delete clicked!", stockId);
    if (stockId) onDelete(stockId);
  }}
  className="px-4 py-2 rounded-md bg-[#ed1c24] text-white"
>
  Delete
</button>

        </div>
      </div>
    </div>
  );
};

export default DeleteStockModal;
