"use client";

import React, { useState } from "react";

export default function page() {
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Search Boarding</h2>
        <form onSubmit={handleSearch}>
          {/* District Filter */}
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

          {/* Type Filter */}
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

          {/* Address Search */}
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

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results Section */}
      {/* Results Section */}
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
        className="p-4 bg-gray-100 rounded-lg shadow-md"
      >
        {/* Image Section */}
        {boarding.imagePaths && boarding.imagePaths.length > 0 ? (
          <img
            src={boarding.imagePaths[0]} // Use the first image in the array
            alt={`Image of ${boarding.address}`}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}

        {/* Text Details */}
        <h4 className="text-lg font-bold text-gray-700">{boarding.address}</h4>
        <p className="text-gray-600">Phone: {boarding.phone}</p>
        <p className="text-gray-600">Price: {boarding.price}</p>
        <p className="text-gray-600">Type: {boarding.type}</p>
        <p className="text-gray-600">District: {boarding.district}</p>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
