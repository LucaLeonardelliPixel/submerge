"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react"; 

interface CustomButtonProps {
  onGameCreated: (created: boolean) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onGameCreated }) => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    setRoomCode(code);
    setCopied(false); 
    onGameCreated(true); // Avvisa che il gioco è stato creato
  };

  const copyToClipboard = async () => {
    if (roomCode) {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true); 
    }
  };

  return (
    <div className="flex justify-center items-center gap-4">
      {/* Pulsante Principale */}
      <button 
        onClick={generateCode}
        className={`
          group font-inter relative flex flex-row-reverse items-center justify-between 
          bg-white border-3 border-[#172459] rounded-full p-1.5 h-14 
          transition-all duration-500 ease-in-out hover:bg-[#172459] overflow-hidden cursor-pointer
          ${roomCode ? "w-48" : "w-55"} 
        `}
      >
        {/* Cerchio con Freccia */}
        <div className={`
          flex items-center justify-center w-10 h-10 bg-[#172459] text-white rounded-full 
          transition-all duration-700 ease-in-out transf orm z-10
          ${roomCode ? "bg-[#172459] text-white group-hover:bg-white group-hover:text-[#172459]" : "group-hover:-translate-x-[165px] group-hover:rotate-180 group-hover:bg-white group-hover:text-[#172459]"}
        `}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>

        {/* Testo Dinamico: "Create Game" o "New Game" */}
        <span className={`
          flex-1 text-center font-semibold transition-all duration-500 z-0
          ${roomCode 
            ? "text-xl text-[#172459] group-hover:text-white translate-x-0" 
            : "text-2xl text-[#172459] group-hover:text-white group-hover:translate-x-10"}
        `}>
          {roomCode ? "New Game" : "Create Game"}
        </span>
      </button>

      {/* Box del Codice con Tasto Copy */}
      <div className={`
        relative h-14 flex items-center justify-between bg-[#172459] text-white rounded-2xl px-4
        transition-all duration-500 ease-out border-3 border-[#172459]
        ${roomCode ? "w-52 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-10 overflow-hidden pointer-events-none"}
      `}>
        <span className="font-mono text-2xl font-bold tracking-wider">
          {roomCode}
        </span>
        
        <button 
          onClick={copyToClipboard}
          className="ml-2 p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
          title={copied ? "Copied!" : "Copy Code"}
        >
          {copied ? (
            <Check size={20} className="text-green-400" />
          ) : (
            <Copy size={20} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CustomButton;