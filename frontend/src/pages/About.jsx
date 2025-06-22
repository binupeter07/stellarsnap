import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const features = [
  {
    icon: "🌌",
    title: "Daily APOD",
    desc: "Astronomy Picture of the Day with detailed explanations. Discover a new image of the cosmos every day, curated by NASA.",
    to: "/apod",
  },
  {
    icon: "🚀",
    title: "Mars Exploration",
    desc: "Browse Mars rover galleries and real mission data. Explore the Red Planet through the eyes of NASA's robotic explorers.",
    to: "/mars-rover",
  },
];

const About = () => {
  return (
    <section className="relative mt-20 lg:mt-28 mb-10 flex flex-col items-center justify-center px-2 sm:px-6 lg:px-0">
      <div className="max-w-6xl w-full text-center mb-12 px-2 sm:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-200 mb-4">
          About StellarSnap
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-4">
          StellarSnap is your interactive gateway to the wonders of space,
          powered by NASA's open APIs. Dive into daily cosmic imagery, explore
          Mars through rover eyes, and view our planet from space—all in one
          seamless, beautiful experience designed for the modern space explorer.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-10 w-full max-w-6xl px-2 sm:px-8">
        {features.map((feature, idx) => (
          <div
            key={feature.title}
            className="w-full sm:w-[380px] bg-black/40 backdrop-blur-md border border-cyan-400/20 grid grid-cols-2 justify-center p-8 gap-4 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:border-cyan-400"
          >
            <div className="col-span-2 text-2xl font-bold capitalize rounded-md flex items-center gap-2 mb-2 text-cyan-200">
              <span className="text-3xl">{feature.icon}</span>
              {feature.title}
            </div>
            <div className="col-span-2 rounded-md text-base text-slate-200 mb-2">
              {feature.desc}
            </div>
            <div className="col-span-2 flex justify-end">
              <Link
                to={feature.to}
                className="rounded-md bg-cyan-900/30 hover:bg-cyan-400 hover:text-white duration-300 p-2 flex items-center gap-1 font-semibold text-sm shadow hover:shadow-lg border border-cyan-400/30"
              >
                Explore
                <ExternalLink size={20} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-6xl w-full text-center mt-16 text-gray-400 text-sm px-2 sm:px-8">
        <p>
          Built for space enthusiasts, students, and explorers of all ages. All
          data sourced directly from NASA's public repositories. Enjoy real-time
          updates and a beautiful, modern interface.
        </p>
      </div>
    </section>
  );
};

export default About;
