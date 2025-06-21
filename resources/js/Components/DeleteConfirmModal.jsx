import React from "react";

const DeleteConfirmModal = ({ itemName, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl border border-red-400/40">
        <h2 className="text-2xl font-extrabold text-red-600 mb-6 tracking-wide">
          Confirm Delete
        </h2>
        <p className="text-gray-800 mb-8 text-lg">
          Are you sure you want to delete{" "}
          <strong className="font-semibold text-red-600">{itemName}</strong>?
        </p>
        <div className="flex justify-end gap-5">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
