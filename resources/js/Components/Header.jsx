import React, { useState, useRef, useEffect } from 'react';
import { GoBell } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '@/Context/AuthContext';

const Header = () => {
  const { admin } = useAuth();
  const [popupOpen, setPopupOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const [notifications, setNotifications] = useState({
    total: 0,
    lowStock: 0,
    pendingRequests: 0,
  });

  // Close popups if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setPopupOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/admin/notifications');
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const cardStyle = 'bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300';
  const titleStyle = 'text-sm text-gray-500';
  const detailStyle = 'text-base font-medium text-gray-800';
  const iconWrapper = 'text-[#ed1c24] bg-[#ffebee] p-2 rounded-full text-xl shadow-inner';

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b z-40 relative">
      {/* Left: Branding */}
      <div>
        <h2 className="text-sm text-gray-500">Welcome to</h2>
        <p className="text-xl font-semibold text-gray-800">Toner Manager</p>
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center gap-6">
        {/* 🔔 Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative text-gray-600 hover:text-[#ed1c24] transition-colors focus:outline-none"
          >
            <GoBell size={24} />
            {notifications.total > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ed1c24] text-white text-xs px-1.5 py-0.5 rounded-full shadow">
                {notifications.total}
              </span>
            )}
          </button>

          {/* Fancy Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fade-in">
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Notifications</h4>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between text-gray-800 hover:bg-gray-50 px-3 py-2 rounded-md transition">
                    <span>🧃 Low Stock</span>
                    <span className="font-bold">{notifications.lowStock}</span>
                  </li>
                  <li className="flex items-center justify-between text-gray-800 hover:bg-gray-50 px-3 py-2 rounded-md transition">
                    <span>🔁 Pending Requests</span>
                    <span className="font-bold">{notifications.pendingRequests}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* 👤 Admin Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setPopupOpen(!popupOpen)}
            className="focus:outline-none"
            aria-haspopup="true"
            aria-expanded={popupOpen}
            aria-label="Admin profile"
          >
            <img
              className="w-9 h-9 rounded-full border-2 border-[#ed1c24] object-cover"
              src="/images/profile.jpg"
              alt="Profile"
            />
          </button>

          {popupOpen && admin && (
            <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fade-in">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconWrapper}>
                    <FaUserCircle />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Admin Details</h3>
                  </div>
                </div>
                <div className="text-gray-800">
                  <p className="mb-1">
                    <strong className="text-sm text-gray-500">Name:</strong>
                    <span className="ml-2 font-medium">{admin.admin_name}</span>
                  </p>
                  <p>
                    <strong className="text-sm text-gray-500">Email:</strong>
                    <span className="ml-2 font-medium">{admin.admin_email}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
