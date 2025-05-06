"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

function page() {
  const searchParams = useSearchParams();

  const district = searchParams.get('district');
  const type = searchParams.get('type');
  const address = searchParams.get('address');

  // Mock data for demonstration
  const mockPhotos = [
    '/photo1.jpg',
    '/photo2.jpg',
    '/photo3.jpg',
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Boarding Details</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Search Details</h3>
          <p className="text-gray-600">District: {district}</p>
          <p className="text-gray-600">Type: {type}</p>
          <p className="text-gray-600">Address: {address}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Photos</h3>
          <div className="grid grid-cols-2 gap-4">
            {mockPhotos.map((photo, index) => (
              <div key={index} className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
