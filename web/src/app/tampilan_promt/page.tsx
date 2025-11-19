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

            {/* INPUT BOX */}
            <div className="w-full max-w-3xl bg-[#2a2a2a] flex items-center px-4 py-3 rounded-full shadow-lg"></div>
             
             {/* Plus icon */ }
            <span className="text-gray-300 text-xl mr-3">＋</span>

             {/* TEXT INPUT */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent text-white outline-none placeholder-gray-400 text-lg"
        />

        {/* Mic icon */}
        {text.length === 0 && (
          <span className="text-gray-300 text-xl mr-3 cursor-pointer">🎤</span>
        )}
        </div>

           
    
  );
}
