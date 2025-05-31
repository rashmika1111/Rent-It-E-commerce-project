"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();

  const district = searchParams.get("district");
  const type = searchParams.get("type");
  const address = searchParams.get("address");

  const [boardingData, setBoardingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoardings = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/boardings/search?district=${encodeURIComponent(
            district
          )}&type=${encodeURIComponent(type)}&address=${encodeURIComponent(address)}`
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

    fetchBoardings();
  }, [district, type, address]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Boarding Details</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Search Details</h3>
          <p className="text-gray-600">District: {district || "Not specified"}</p>
          <p className="text-gray-600">Type: {type || "Not specified"}</p>
          <p className="text-gray-600">Address: {address || "Not specified"}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Results</h3>
          {boardingData.length === 0 ? (
            <p className="text-gray-600">No results found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {boardingData.map((boarding) => (
                <div
                  key={boarding.id}
                  className="p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-bold text-gray-700">{boarding.address}</h4>
                  <p className="text-gray-600">Phone: {boarding.phone}</p>
                  <p className="text-gray-600">Price: {boarding.price}</p>
                  <p className="text-gray-600">Type: {boarding.type}</p>
                  <p className="text-gray-600">District: {boarding.district}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
