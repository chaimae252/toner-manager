import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';  // import usePage
import { LuBox } from 'react-icons/lu';
import { AiOutlinePrinter } from 'react-icons/ai';
import { CiPen } from 'react-icons/ci';
import { FaBoxOpen } from 'react-icons/fa';
import { PiGitPullRequestBold } from 'react-icons/pi';
import { FaLocationDot } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
    const { post } = useForm();
    const { url } = usePage();  // get current url from Inertia

    const handleLogout = (e) => {
        e.preventDefault();
        post('/admin/logout');
    };

    const SIDEBAR_LINKS = [
        { id: 1, path: '/admin-dashboard', name: 'Dashboard', icon: LuBox },
        { id: 2, path: '/printers', name: 'Printers', icon: AiOutlinePrinter },
        { id: 3, path: '/toners', name: 'Toners', icon: CiPen },
        { id: 4, path: '/stock', name: 'Stock', icon: FaBoxOpen },
        { id: 5, path: '/locations', name: 'Locations', icon: FaLocationDot },
        { id: 6, path: '/requests', name: 'Requests', icon: PiGitPullRequestBold }
    ];

    return (
        <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white flex flex-col justify-between'>
            <div>
                <div className='mb-8'>
                    <img src="/images/yazaki.png" alt="Logo" className='w-48 hidden md:flex' />
                </div>
                <ul className='mt-6 space-y-6'>
                    {SIDEBAR_LINKS.map((link) => {
                        const isActive = url === link.path; // check if current url matches link path

                        return (
                            <li
                                key={link.id}
                                className={`font-medium rounded-md py-2 px-5 transition-colors duration-300 flex items-center gap-4 
                                    ${isActive ? "bg-[#ed1c24]/10 text-[#ed1c24]" : "text-gray-700 hover:bg-[#ed1c24]/10 hover:text-[#ed1c24]"}`}
                            >
                                <Link href={link.path} className="flex items-center gap-4 w-full">
                                    <span>{React.createElement(link.icon)}</span>
                                    <span>{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* 🔒 Logout Button */}
            <div className='mb-6'>
                <form onSubmit={handleLogout}>
                    <button
                        type="submit"
                        className='w-full text-left font-medium rounded-md py-2 px-5 hover:bg-[#ed1c24]/10 transition-colors duration-300 hover:text-[#ed1c24] text-gray-700 flex items-center gap-4'
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Sidebar;
