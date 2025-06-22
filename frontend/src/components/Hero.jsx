import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center gap-8 pt-12 pb-12 min-h-[60vh]">
      <div className="z-10 flex flex-col items-center text-center space-y-6">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-2">
          Embark on a Journey Through the Cosmos
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-200">
          Powered by StellarSnap & NASA's Open APIs
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-6">
          Explore breathtaking astronomy images, discover daily wonders, and
          experience Mars through the eyes of NASA's rovers—all in one
          immersive, modern platform.
        </p>
      </div>
    </section>
  );
};

export default Hero;
