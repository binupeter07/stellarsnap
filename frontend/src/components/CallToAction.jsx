import React from "react";

const CallToAction = () => {
  return (
    <div className="w-full max-w-2xl mx-auto border border-cyan-700 rounded-xl p-6 sm:p-8 mt-8 text-center">
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
        Start Your Exploration
      </h3>
      <p className="text-cyan-200 mb-6 max-w-lg mx-auto">
        Dive into the cosmos, explore stunning visuals, and uncover the secrets
        of the universe.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="/apod"
          className="px-8 py-3 rounded-lg bg-cyan-500 text-white font-semibold text-lg shadow-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition duration-200 w-full sm:w-auto text-center"
        >
          Get Started
        </a>
        <a
          href="https://api.nasa.gov/"
          className="px-8 py-3 rounded-lg bg-white text-cyan-700 font-semibold text-lg shadow-lg hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition duration-200 w-full sm:w-auto text-center"
        >
          View Documentation
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
