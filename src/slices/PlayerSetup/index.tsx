"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `PlayerSetup`.
 */
export type PlayerSetupProps = SliceComponentProps<Content.PlayerSetupSlice>;

/**
 * Component for "PlayerSetup" Slices.
 */
const PlayerSetup: FC<PlayerSetupProps> = ({ slice }) => {
  // Stati per gestire il flusso del gioco
  const [step, setStep] = useState<"TEAM_SELECTION" | "CUSTOMIZATION" | "FINISHED">("TEAM_SELECTION");
  const [playerData, setPlayerData] = useState({
    team: "",
    name: "",
    icon: "🚀",
  });

  const icons = ["🚀", "👾", "⚡", "🔥", "🛡️"];

  // Funzione per gestire la selezione del team
  const selectTeam = (team: "P1" | "P2") => {
    setPlayerData({ ...playerData, team });
    setStep("CUSTOMIZATION");
  };

  return (
    <section
      className="relative font-inter"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* OVERLAY BLOCCANTE (Modale)
          Si chiude solo quando step === "FINISHED"
      */}
      {step !== "FINISHED" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/40 backdrop-blur-md p-4 overflow-hidden">
          
          {/* BOX CENTRALE DEL MODALE */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(23,36,89,0.2)] border-2 border-[#172459] max-w-md w-full animate-in fade-in zoom-in duration-300">
            
            {/* STEP 1: SELEZIONE GIOCATORE */}
            {step === "TEAM_SELECTION" && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#172459] mb-8">Select Your Player</h2>
                <div className="flex flex-col gap-5">
                  <button
                    onClick={() => selectTeam("P1")}
                    className="w-full py-4 rounded-full border-2 border-[#172459] text-[#172459] text-xl font-bold transition-all hover:bg-[#172459] hover:text-white"
                  >
                    Player 1 (Blue)
                  </button>
                  <button
                    onClick={() => selectTeam("P2")}
                    className="w-full py-4 rounded-full border-2 border-red-600 text-red-600 text-xl font-bold transition-all hover:bg-red-600 hover:text-white"
                  >
                    Player 2 (Red)
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PERSONALIZZAZIONE NOME E ICONA */}
            {step === "CUSTOMIZATION" && (
              <div className="animate-in slide-in-from-right-10 duration-500">
                <h2 className="text-3xl font-bold text-[#172459] mb-8 text-center">Setup Profile</h2>
                
                <div className="space-y-8">
                  {/* Input Nome con cursore "select" */}
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 ml-4 uppercase tracking-wider">Name</label>
                    <input 
                      type="text"
                      placeholder="Your nickname"
                      className="w-full h-14 px-8 rounded-full border-2 border-slate-100 focus:border-[#172459] outline-none text-xl font-semibold text-[#172459] cursor-text transition-all"
                      onChange={(e) => setPlayerData({...playerData, name: e.target.value})}
                      autoFocus
                    />
                  </div>

                  {/* Selezione Icona */}
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 ml-4 uppercase tracking-wider">Icon</label>
                    <div className="flex justify-between px-2">
                      {icons.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => setPlayerData({...playerData, icon})}
                          className={`text-3xl w-14 h-14 flex items-center justify-center rounded-full transition-all border-2 ${
                            playerData.icon === icon 
                            ? 'border-[#172459] bg-slate-50 scale-110' 
                            : 'border-transparent opacity-50 hover:opacity-100'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Conferma Finale */}
                  <button
                    onClick={() => setStep("FINISHED")}
                    disabled={playerData.name.length < 2}
                    className="w-full h-14 bg-[#172459] text-white rounded-full text-xl font-bold hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
                  >
                    Confirm & Start
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTENUTO DELLA PAGINA 
          Appare sfocato finché il modale è attivo
      */}
      <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${step !== "FINISHED" ? "blur-2xl scale-95 pointer-events-none" : "blur-0 scale-100"}`}>
        <h1 className="text-4xl font-black text-[#172459]">Game Ready</h1>
        <div className="mt-8 p-6 bg-slate-50 rounded-3xl border-2 border-[#172459]/10 text-center">
           <span className="text-6xl block mb-4">{playerData.icon}</span>
           <p className="text-2xl font-bold text-[#172459]">{playerData.name}</p>
           <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-2">
             Team {playerData.team === "P1" ? "Blue" : "Red"}
           </p>
        </div>
      </div>

    </section>
  );
};

export default PlayerSetup;
