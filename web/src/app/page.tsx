import React from "react";

export default function HeaderWithLogo() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">astro-ai</h1>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
          Login
        </button>
      </header>

      {/* TEKS SELAMAT DATANG */}
        <h2 className="text-xl font-semibold mb-6 text-gray-700 text-center justify-center items-center mt-20 "
        style={{
            fontFamily: "'Cinzel Decorative', cursive",
            fontWeight: 700,
            letterSpacing: "2px"
          }}
        >
          Selamat datang di Astri AI
        </h2>

      {/* LOGO + NAMA DI TENGAH */}
      <div className="flex flex-col justify-center items-center mt-10">
        {/* LOGO */}
        <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          LOGO
        </div>

        {/* NAMA */}
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Astro-Ai
        </h2>
      </div>

    </div>
  );
}
