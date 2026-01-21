"use client";

import React, { useState } from "react";

interface PlayerModalProps {
  onSelect: (player: "P1" | "P2") => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSelection = (player: "P1" | "P2") => {
    setIsOpen(false);
    onSelect(player);
  };

  if (!isOpen) return null;

  return (
    // Overlay fisso che copre tutto e impedisce i click sotto (z-50)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md">
      
      {/* Box del Modale */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full mx-4 border-2 border-[#172459]">
        <h2 className="font-inter text-3xl font-bold text-[#172459] mb-8">
          Select Your Player
        </h2>
        
        <div className="flex flex-col gap-4">
          {/* Bottone Player 1 - BLU (#172459 come il tuo brand) */}
          <button
            onClick={() => handleSelection("P1")}
            className="group relative flex items-center justify-center bg-white border-2 border-[#172459] rounded-full py-4 px-8 transition-all duration-300 hover:bg-[#172459] overflow-hidden"
          >
            <span className="font-inter text-xl font-bold text-[#172459] group-hover:text-white transition-colors">
              Player 1
            </span>
          </button>

          {/* Bottone Player 2 - ROSSO */}
          <button
            onClick={() => handleSelection("P2")}
            className="group relative flex items-center justify-center bg-white border-2 border-red-600 rounded-full py-4 px-8 transition-all duration-300 hover:bg-red-600 overflow-hidden"
          >
            <span className="font-inter text-xl font-bold text-red-600 group-hover:text-white transition-colors">
              Player 2
            </span>
          </button>
        </div>

        <p className="mt-6 text-sm text-slate-500 font-inter italic">
          You must choose a side to start the game.
        </p>
      </div>
    </div>
  );
};

export default PlayerModal;