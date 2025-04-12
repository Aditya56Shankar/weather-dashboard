import React, { useState } from 'react';
import { FaCloudSun, FaSearch } from 'react-icons/fa';

function Myapp() {
    const [search, setsearch] = useState("");
    const [data, setdata] = useState();
    const [theme, setTheme] = useState("light"); 

    const city = (e) => {
        setsearch(e.target.value);
    };

    const mycity = async () => {
        if (search === "") {
            alert("Invalid city name");
            return;
        }
        const get = await fetch(`http://localhost:5000/weather?city=${search}`);
        const jdata = await get.json();
        console.log(jdata);
        setdata(jdata);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center p-4 ${theme === "light" ? "bg-gradient-to-b from-blue-100 to-blue-200" : "bg-gray-900"
                }`}
        >
            <div
                className={`max-w-md w-full rounded-xl shadow-lg overflow-hidden ${theme === "light" ? "bg-white" : "bg-gray-800 text-white"
                    }`}
            >
                <div
                    className={`p-4 text-center ${theme === "light" ? "bg-blue-600" : "bg-gray-700"
                        }`}
                >
                    <h1 className="text-2xl font-bold flex items-center justify-center">
                        <FaCloudSun className="mr-2" /> Weather Forecasting
                    </h1>
                </div>

                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="Enter your city"
                            onChange={city}
                            className={`flex-1 p-3 border rounded-l-lg focus:outline-none ${theme === "light"
                                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    : "border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-gray-500"
                                }`}
                        />
                        <button
                            onClick={mycity}
                            className={`p-3 rounded-r-lg transition-colors duration-300 ${theme === "light"
                                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                                    : "bg-gray-600 hover:bg-gray-500 text-white"
                                }`}
                        >
                            <FaSearch className="text-lg" />
                        </button>
                    </div>

                    <div className="flex justify-end mb-4">
                        <button
                            onClick={toggleTheme}
                            className={`px-4 py-2 rounded-lg ${theme === "light"
                                    ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                    : "bg-gray-700 hover:bg-gray-600 text-white"
                                }`}
                        >
                            Toggle {theme === "light" ? "Dark" : "Light"} Mode
                        </button>
                    </div>

                    <div className="mt-4">
                        {data && (
                            <div
                                className={`text-center p-4 rounded-lg ${theme === "light" ? "bg-blue-50" : "bg-gray-700"
                                    }`}
                            >
                                <div className="flex items-center justify-center">
                                    <img src={data.icon} alt="" />
                                    <span className="text-3xl font-bold mb-2">
                                        {data.city}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                                    <div
                                        className={`p-3 rounded-lg shadow ${theme === "light" ? "bg-white" : "bg-gray-600"
                                            }`}
                                    >
                                        <p className="text-gray-500">Humidity</p>
                                        <p className="text-lg font-semibold">
                                            {data.humidity}%
                                        </p>
                                    </div>
                                    <div
                                        className={`p-3 rounded-lg shadow ${theme === "light" ? "bg-white" : "bg-gray-600"
                                            }`}
                                    >
                                        <p className="text-gray-500">Wind Speed</p>
                                        <p className="text-lg font-semibold">
                                            {data.windSpeed}
                                        </p>
                                    </div>
                                    <div
                                        className={`p-3 rounded-lg shadow ${theme === "light" ? "bg-white" : "bg-gray-600"
                                            }`}
                                    >
                                        <p className="text-gray-500">Feels Like</p>
                                        <p className="text-lg font-semibold">
                                            {data.weatherCondition}
                                        </p>
                                    </div>
                                    <div
                                        className={`p-3 rounded-lg shadow ${theme === "light" ? "bg-white" : "bg-gray-600"
                                            }`}
                                    >
                                        <p className="text-gray-500">Temperature</p>
                                        <p className="text-lg font-semibold">
                                            {Math.trunc(data.temperature)}°C
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Myapp;