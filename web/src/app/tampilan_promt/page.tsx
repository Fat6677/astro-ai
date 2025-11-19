"use client";

import { useState } from "react";

export default function TampilanPrompt() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-start pt-32 px-4">
      
      {/* TITLE */}
      <h1 className="text-3xl font-semibold text-white mb-10">
        What are you working on?
      </h1>
    </div>
  );
}
