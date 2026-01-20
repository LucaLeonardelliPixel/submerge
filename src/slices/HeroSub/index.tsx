"use client";

import { FC, useState } from "react"; // Aggiunto useState
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import CustomButton from "@/app/component/CustomButton";
import JoinGameInput from "@/app/component/JoinGameInput";

export type HeroSubProps = SliceComponentProps<Content.HeroSubSlice>;

const HeroSub: FC<HeroSubProps> = ({ slice }) => {
  const [isGameCreated, setIsGameCreated] = useState(false);

  return (
    <section className="relative h-screen w-full flex flex-col items-center bg-white overflow-hidden">
      {/* --- LOGO --- */}
      <div className="mt-12 flex justify-center z-20">
        {slice.primary.logo_image && (
          <div className="w-[300px] md:w-[600px]">
            <PrismicNextImage field={slice.primary.logo_image} priority className="w-full h-auto" />
          </div>
        )}
      </div>

      {/* --- BOTTONE CENTRALE --- */}
      <div className="flex-1 flex items-center justify-center">
        <CustomButton onGameCreated={setIsGameCreated} />
      </div>

      {/* --- FORM IN FONDO (Condizionale) --- */}
      <div className={`
        mb-16 pb-8 transition-all duration-1000 ease-in-out
        ${isGameCreated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}
      `}> 
        <p className="text-[#172459]/50 text-center font-bold mb-3 tracking-widest text-sm">
          OR JOIN A PRIVATE ROOM
        </p>
        <JoinGameInput />
      </div>
    </section>
  );
};

export default HeroSub;