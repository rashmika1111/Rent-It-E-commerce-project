"use client";

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

function page() {
  const searchParams = useSearchParams();

  const address = searchParams.get('address');
  const phone = searchParams.get('phone');
  const price = searchParams.get('price');
  const type = searchParams.get('type');
  const maxPersons = searchParams.get('maxPersons');
  const roomCapacity = searchParams.get('roomCapacity');

  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImageUrls]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      address,
      phone,
      price,
      type,
      maxPersons,
      roomCapacity,
      images: images.map((img) => img.file), // Send file objects for backend processing
    };

    console.log('Submitting Data:', data);
    // Add API call or submission logic here
  };

  if (!address || !phone || !price || !type) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">Error: Missing boarding details in the URL.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Boarding Details</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Basic Details</h3>
          <p className="text-gray-600">Address: {address}</p>
          <p className="text-gray-600">Phone: {phone}</p>
          <p className="text-gray-600">Price: {price}</p>
          <p className="text-gray-600">Type: {type}</p>
          {type === 'house' && <p className="text-gray-600">Max Persons: {maxPersons}</p>}
          {type === 'room' && <p className="text-gray-600">Room Capacity: {roomCapacity}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="images" className="block text-gray-600 font-medium mb-2">
              Add Photos
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {images.length > 0 && (
            <div className="mb-4 grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.url}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded-lg shadow"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
