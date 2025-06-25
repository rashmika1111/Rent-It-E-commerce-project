"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Page() {
  const router = useRouter(); 
  const [district, setDistrict] = useState("");
  const [type, setType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [boardingData, setBoardingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/boardings/search?district=${encodeURIComponent(
          district
        )}&type=${encodeURIComponent(type)}&address=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBoardingData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 relative">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Search Boarding
        </h2>
        <form onSubmit={handleSearch}>
          <div className="mb-4">
            <label htmlFor="district" className="block text-gray-600 font-medium mb-2">
              Select District
            </label>
            <select
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="" disabled>
                Select district
              </option>
              {districts.map((districtName) => (
                <option key={districtName} value={districtName}>
                  {districtName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-600 font-medium mb-2">
              Select Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="house">House</option>
              <option value="room">Room</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="searchQuery" className="block text-gray-600 font-medium mb-2">
              Search by Address
            </label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter address to search"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Search
          </button>
        </form>
      </div>
      <div className="w-full max-w-3xl">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Search Results</h3>
        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">Error: {error}</div>}
        {boardingData.length === 0 && !loading && !error && (
          <p className="text-gray-600">No results found. Please try different filters.</p>
        )}
        <div className="grid grid-cols-1 gap-4">
          {boardingData.map((boarding) => (
            <div
              key={boarding.id}
              className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-start"
            >
              {boarding.imagePaths && boarding.imagePaths.length > 0 ? (
                <img
                  src={`http://localhost:8080/${boarding.imagePaths[0]}`}
                  alt={`Image of ${boarding.address}`}
                  className="w-full h-64 object-cover rounded-lg shadow-sm mb-4"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              <h4 className="text-lg font-bold text-gray-800 mb-2">{boarding.address}</h4>
              <p className="text-gray-600 mb-1">Phone: {boarding.phone}</p>
              <p className="text-gray-600 mb-1">Price: {boarding.price}</p>
              <p className="text-gray-600 mb-1">Type: {boarding.type}</p>
              <p className="text-gray-600">District: {boarding.district}</p>
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => router.push("/")} 
        className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        Home
      </button>
    </div>
  );
}
