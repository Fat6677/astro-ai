import React from "react";
import Link from "next/link";


export default function HeaderWithLogo() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
          <img src="logo.png" alt="logo" />
        </div>
        <Link
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition shadow"
        > Login
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

      {/* LOGO + NAMA */}
      <div className="flex items-start gap-10 px-10 mt-10 ml-40">
        {/* LOGO */}
        <div className="w-70 h-70 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
          <img src="logo.png" alt="logo" />
        </div>


        {/* DESKRIPSI */}
        <p className="mt-6 max-w-xl text-gray-600 px-6 leading-relaxed text-justify">
          Astro AI adalah sebuah kecerdasan buatan yang dirancang sebagai pendamping cerdas dalam kehidupan sehari-hari. Dengan kemampuan memahami konteks percakapan, menganalisis kebutuhan pengguna, serta memberikan rekomendasi yang tepat, Astro AI hadir sebagai “AI Permal Kehidupan” — sebuah asisten digital yang selalu siap membantu berbagai aktivitas harian.

          Astro AI mampu menjawab pertanyaan, memberikan solusi praktis, membantu pengambilan keputusan, serta mendampingi pengguna dalam belajar, bekerja, maupun berkreasi. Dengan antarmuka yang ramah dan respons cepat, Astro AI memberikan pengalaman interaksi yang intuitif dan personal, seperti berbicara dengan seorang asisten nyata.

          Dibangun dengan teknologi modern dan kecerdasan adaptif, Astro AI terus berkembang mengikuti kebiasaan dan kebutuhan penggunanya. Mulai dari mencari informasi, merencanakan kegiatan, membuat konten, hingga membantu pekerjaan teknis, Astro AI menjadi partner cerdas yang setia di setiap momen penting dalam kehidupan.
        </p>


      </div>
       <footer className="bg-blue-600 text-white py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* NAMA APLIKASI */}
        <h2 className="text-xl font-bold tracking-wide">
          Astro AI
        </h2>

        {/* COPYRIGHT */}
        <p className="text-sm mt-4 md:mt-0 opacity-80">
          © {new Date().getFullYear()} Astro AI. All Rights Reserved.
        </p>
      </div>
    </footer>

    </div>

    
  );
}
