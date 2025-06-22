import Hero from "../components/Hero";
import FeaturedAPOD from "../components/FeaturedAPOD";
import CallToAction from "../components/CallToAction";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center px-2 sm:px-4">
      {/* Hero Section */}
      <Hero />
      <FeaturedAPOD />
      <div className="text-center px-4 sm:px-6 lg:px-8 py-16 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-200 mb-4">
          Your Gateway to the Cosmos
        </h2>
        <p className="text-lg md:text-xl text-gray-300">
          StellarSnap is your interactive portal to the wonders of space,
          powered by NASA's open APIs. Dive into daily cosmic imagery, explore
          Mars through rover eyes, and view our planet from space—all in one
          seamless, beautiful experience.
        </p>
      </div>
      {/* Call to Action Section */}
      <div className="w-full pb-8 flex justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
