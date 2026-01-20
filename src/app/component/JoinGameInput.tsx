"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const JoinGameInput: React.FC = () => {
  const [code, setCode] = useState("");

  return (
    <div className="flex justify-center items-center gap-3">
      {/* Textbox per l'inserimento del codice */}
      <div className="relative group">
        <input
          type="text"
          maxLength={5}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="ENTER CODE"
          className="w-55 h-14 bg-white border-3 border-[#172459] rounded-2xl px-6 
                     text-2xl font-bold text-[#172459] placeholder:text-[#172459]/40 
                     focus:outline-none focus:ring-2 focus:ring-[#172459]/20 
                     transition-all duration-300 font-mono tracking-widest"
        />
      </div>

      {/* Bottone d'invio con freccia a 45 gradi */}
      <button 
        className="w-14 h-14 bg-[#172459] border-3 border-[#172459] text-white rounded-2xl 
                   flex items-center justify-center hover:bg-white hover:text-[#172459] 
                   transition-all duration-300 group shadow-md active:scale-95 cursor-pointer"
      >
        <ArrowUpRight 
          size={32} 
          strokeWidth={3} 
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
        />
      </button>
    </div>
  );
};

export default JoinGameInput;