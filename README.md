# 🖨️ Toner Manager

A web-based toner inventory and management system built with **Laravel**, **Inertia.js**, and **React**.  
Designed for internal use to monitor toner stocks, manage printer requests, and maintain inventory health efficiently.

---

## 📌 Features

- 🖨️ Manage Printers, Toners, and Locations  
- 🎨 Toner color tracking and quantity overview  
- 🧾 Real-time toner request handling  
- 📊 Toner usage chart & stock health dashboard  
- 🧑‍💼 Admin authentication and control panel  
- 🔔 Smart notifications for low stock or pending requests  
- 🧩 Clean and modern UI with React + Tailwind CSS  

---

## 🛠️ Tech Stack

- **Backend:** Laravel 12  
- **Frontend:** React.js (via Inertia.js)  
- **Database:** MySQL  
- **Styling:** Tailwind CSS  
- **Authentication:** Custom admin guard with Laravel  

---

## 🚀 Installation

```bash
git clone https://github.com/chaimae252/toner-manager.git
cd toner-manager
cp .env.example .env
composer install
npm install
php artisan key:generate
php artisan migrate
npm run dev
php artisan serve
