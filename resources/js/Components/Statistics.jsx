    import React, { useState, useEffect } from "react";
    import { AiOutlinePrinter } from "react-icons/ai";
    import { CiPen } from "react-icons/ci";
    import { RiAlertLine } from "react-icons/ri";
    import { FaBoxOpen } from "react-icons/fa";
    import axios from 'axios';

    const cardStyle =
        "bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4";
    const titleStyle = "text-sm text-gray-500";
    const countStyle = "text-3xl font-bold text-gray-800";
    const iconWrapper =
        "text-[#ed1c24] bg-[#fef2f2] p-3 rounded-xl text-2xl shadow-inner";

    const Statistics = () => {
        const [statistics, setStatistics] = useState({
            totalPrinters: 0,
            totalToners: 0,
            tonersInStock: 0,
            lowStockToners: 0,
        });

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('/statistics');
                    setStatistics(response.data);
                } catch (error) {
                    console.error("Error fetching statistics:", error);
                }
            };

            fetchData();
        }, []);

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Total Printers */}
                <div className={`${cardStyle} border-[#ed1c24]`}>
                    <div className="flex items-center gap-4">
                        <div className={iconWrapper}>
                            <AiOutlinePrinter />
                        </div>
                        <div>
                            <h3 className={titleStyle}>Total Printers</h3>
                            <p className={countStyle}>{statistics.totalPrinters}</p>
                        </div>
                    </div>
                </div>

                {/* Total Toners */}
                <div className={`${cardStyle} border-[#ed1c24]`}>
                    <div className="flex items-center gap-4">
                        <div className={iconWrapper}>
                            <CiPen />
                        </div>
                        <div>
                            <h3 className={titleStyle}>Total Toners</h3>
                            <p className={countStyle}>{statistics.totalToners}</p>
                        </div>
                    </div>
                </div>

                {/* Toners in Stock */}
                <div className={`${cardStyle} border-[#ed1c24]`}>
                    <div className="flex items-center gap-4">
                        <div className={iconWrapper}>
                            <FaBoxOpen />
                        </div>
                        <div>
                            <h3 className={titleStyle}>Toners in Stock</h3>
                            <p className={countStyle}>{statistics.tonersInStock}</p>
                        </div>
                    </div>
                </div>

                {/* Low Stock Toners */}
                <div className={`${cardStyle} border-[#ed1c24]`}>
                    <div className="flex items-center gap-4">
                        <div className={iconWrapper}>
                            <RiAlertLine />
                        </div>
                        <div>
                            <h3 className={titleStyle}>Low Stock Toners</h3>
                            <p className={countStyle}>{statistics.lowStockToners}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Statistics;
    