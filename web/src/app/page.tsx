import React from "react";
import Link from "next/link";


export default function HeaderWithLogo() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">astro-ai</h1>

        <Link
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition shadow"
        >
          Login
        </Link>


      </header>

      {/* TEKS SELAMAT DATANG */}
      <h2 className="text-xl font-semibold mb-6 text-gray-700 text-center justify-center items-center mt-20 "
        style={{
          fontFamily: "'Cinzel Decorative', cursive",
          fontWeight: 700,
          letterSpacing: "2px"
        }}
      >
        Selamat datang di Astro AI
      </h2>

      {/* LOGO + NAMA DI TENGAH */}
      <div className="flex flex-col  ml-10">
        {/* LOGO */}
        <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          LOGO
        </div>

        {/* NAMA */}
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Astro-Ai
        </h2>
        {/* DESKRIPSI */}
        <p className="mt-6 max-w-xl text-gray-600 px-6 leading-relaxed text-justify">
          Astro AI adalah sebuah kecerdasan buatan yang dirancang sebagai pendamping cerdas dalam kehidupan sehari-hari. Dengan kemampuan memahami konteks percakapan, menganalisis kebutuhan pengguna, serta memberikan rekomendasi yang tepat, Astro AI hadir sebagai “AI Permal Kehidupan” — sebuah asisten digital yang selalu siap membantu berbagai aktivitas harian.

          Astro AI mampu menjawab pertanyaan, memberikan solusi praktis, membantu pengambilan keputusan, serta mendampingi pengguna dalam belajar, bekerja, maupun berkreasi. Dengan antarmuka yang ramah dan respons cepat, Astro AI memberikan pengalaman interaksi yang intuitif dan personal, seperti berbicara dengan seorang asisten nyata.

          Dibangun dengan teknologi modern dan kecerdasan adaptif, Astro AI terus berkembang mengikuti kebiasaan dan kebutuhan penggunanya. Mulai dari mencari informasi, merencanakan kegiatan, membuat konten, hingga membantu pekerjaan teknis, Astro AI menjadi partner cerdas yang setia di setiap momen penting dalam kehidupan.
        </p>

      </div>
    </div>
  );
}
