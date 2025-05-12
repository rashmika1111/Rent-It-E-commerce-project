"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function page() {
  const [type, setType] = useState('');
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    price: '',
    maxPersons: '',
    roomCapacity: '',
    district: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const queryString = new URLSearchParams({ ...formData, type }).toString();
    router.push(`/boader/details?${queryString}`);
  };

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 
    'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
    'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
    'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya',
    'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Boarding Dashboard</h2>
        <form onSubmit={handleNext}>
          {/* Address Field */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-600 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter address"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-600 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Price Field */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-600 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter price"
              required
            />
          </div>

          {/* District Selector */}
          <div className="mb-4">
            <label htmlFor="district" className="block text-gray-600 font-medium mb-2">
              District
            </label>
            <select
              id="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="" disabled>
                Select district
              </option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Type Selector */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-600 font-medium mb-2">
              Type
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

          {/* Conditional Fields for House */}
          {type === 'house' && (
            <div className="mb-4">
              <label htmlFor="maxPersons" className="block text-gray-600 font-medium mb-2">
                Maximum Persons (0 for unlimited)
              </label>
              <input
                type="number"
                id="maxPersons"
                value={formData.maxPersons}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter maximum persons"
              />
            </div>
          )}

          {/* Conditional Fields for Room */}
          {type === 'room' && (
            <div className="mb-4">
              <label htmlFor="roomCapacity" className="block text-gray-600 font-medium mb-2">
                Room Capacity
              </label>
              <select
                id="roomCapacity"
                value={formData.roomCapacity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="4">4 Persons</option>
              </select>
            </div>
          )}

          {/* Next Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
