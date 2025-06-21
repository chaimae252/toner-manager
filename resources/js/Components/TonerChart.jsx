import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TonerChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Toner Usage",
                data: [],
                backgroundColor: "#ed1c24",
                borderRadius: 8,
            },
        ],
    });

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/toner-usage");
                setChartData({
                    labels: response.data.labels,
                    datasets: [
                        {
                            label: "Toner Usage",
                            data: response.data.data,
                            backgroundColor: "#ed1c24",
                            borderRadius: 8,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching toner usage:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md h-[360px] w-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Toner Usage Chart
            </h2>
            <div className="h-[290px]">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default TonerChart;
