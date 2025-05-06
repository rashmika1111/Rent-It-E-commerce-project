import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <Image
        src="/intro.jpg" // Replace with your actual background image path
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="-z-10"
      />

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-white text-4xl font-bold mb-8">Welcome To Rent It</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Guide Button */}
          <Link href="/customer/login">
            <button
              className="bg-green-500 text-white text-lg font-semibold py-4 px-6 rounded-2xl shadow-md flex items-center space-x-4 hover:bg-green-600 transition"
            >
              <img
                src="/bed.png" // Replace with your actual icon path
                alt="Customer Guide Icon"
                className="h-8 w-8"
              />
              <span>Customer Guide</span>
            </button>
          </Link>

          {/* Boarding Button */}

          <Link href="/boader/login">

          <button
            className="bg-green-500 text-white text-lg font-semibold py-4 px-6 rounded-2xl shadow-md flex items-center space-x-4 hover:bg-green-600 transition"
          >
            <img
              src="/home.png" // Replace with your actual icon path
              alt="Boarding Icon"
              className="h-8 w-8"
            />
            <span>Boarding</span>
          </button>
          
          </Link>
          
        </div>
      </div>
    </div>
  );
}
