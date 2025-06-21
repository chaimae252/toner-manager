import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full ml-16 md:ml-56"> {/* ✅ Matches Sidebar widths */}
                <Header />
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
