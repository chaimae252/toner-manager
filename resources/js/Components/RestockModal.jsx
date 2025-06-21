import React, { useState } from "react";

const RestockModal = ({ show, stockId, onClose, onRestock }) => {
  const [amount, setAmount] = useState(1);

  if (!show || stockId === null) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-[#22c55e]">Restock Toner</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (stockId) {
              onRestock(stockId, parseInt(amount));
              setAmount(1); // Reset form
            }
          }}
          className="space-y-4"
        >
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2"
            placeholder="Amount to add"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#22c55e] text-white"
            >
              Restock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestockModal;
