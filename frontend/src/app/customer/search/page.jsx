"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function page() {
  const [district, setDistrict] = useState('');
  const [type, setType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/customer/details',
      query: { district, type, address: searchQuery },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
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
              <option value="district1">District 1</option>
              <option value="district2">District 2</option>
              <option value="district3">District 3</option>
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
    </div>
  );
}

export default page;