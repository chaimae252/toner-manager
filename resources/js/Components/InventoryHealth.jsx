import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryHealth = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/inventory-health');
        console.log('API Response:', response); // Debug: Log the entire response
        console.log('Inventory Data:', response.data); // Debug: Log the inventory data

        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory health:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md h-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-6">Inventory Health Summary</h2>
      <ul className="space-y-5 text-sm text-gray-700">
        {inventory.map(({ label, count, color, percentage }) => {
          console.log(`Label: ${label}, Color: ${color}, Percentage: ${percentage}`); // Debug: Log each item's properties
          return (
            <li key={label}>
              <div className="flex justify-between mb-1 font-medium">
                <span>{label}</span>
                <span>{count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`${color} !important h-4 rounded-full transition-width duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InventoryHealth;
