export default function page() {
  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: "url('/intro.jpg')",
        }}
      ></div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-white text-4xl font-bold mb-8">Welcome To Rent It</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Guide Button */}
          <a href="/customer/login">
            <button className="bg-green-500 text-white text-lg font-semibold py-4 px-6 rounded-2xl shadow-md flex items-center space-x-4 hover:bg-green-600 transition">
              <img
                src="/bed.png" // Replace with your actual icon path
                alt="Customer Guide Icon"
                className="h-8 w-8"
              />
              <span>Customer Guide</span>
            </button>
          </a>

          {/* Boarding Button */}
          <a href="/boader/login">
            <button className="bg-green-500 text-white text-lg font-semibold py-4 px-6 rounded-2xl shadow-md flex items-center space-x-4 hover:bg-green-600 transition">
              <img
                src="/home.png" // Replace with your actual icon path
                alt="Boarding Icon"
                className="h-8 w-8"
              />
              <span>Boarding</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
