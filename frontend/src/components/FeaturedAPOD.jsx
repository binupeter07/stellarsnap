import { useState, useEffect } from "react";
import apiService from "../services/ApiService";
import LoadingIndicator from "./common/LoadingIndicator";

const FeaturedAPOD = () => {
  const [apodData, setApodData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAPODData = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getAPOD(); // No date, gets the latest
        setApodData(response);
        setError(null);
      } catch (err) {
        setError(
          err.message || "Failed to load the Astronomy Picture of the Day."
        );
        setApodData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAPODData();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-200">
          Featured Picture of the Day
        </h2>
      </div>
      <div className="bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] rounded-2xl shadow-lg overflow-hidden border border-[#23244a] transition-all duration-300 group hover:border-cyan-400 hover:shadow-[0_0_32px_#00d1ff55] max-w-5xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingIndicator
              isLoading={isLoading}
              msg="Loading astronomy picture..."
            />
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded max-w-2xl mx-auto">
              <p>{error}</p>
            </div>
          </div>
        ) : apodData ? (
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/5 bg-[#181929] flex items-center justify-center p-4">
              {apodData.media_type === "image" ? (
                <a
                  href={apodData.hdurl || apodData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className="max-w-full max-h-[70vh] object-contain shadow-lg"
                  />
                </a>
              ) : (
                <div className="w-full aspect-w-16 aspect-h-9">
                  <iframe
                    src={apodData.url}
                    title={apodData.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            <div className="w-full lg:w-2/5 p-6 flex flex-col">
              <h3 className="text-2xl font-bold text-cyan-200 mb-2">
                {apodData.title}
              </h3>
              <p className="text-gray-400 mb-4">
                {new Date(apodData.date).toLocaleDateString()}
              </p>
              <div className="bg-[#23244a]/60 rounded p-4 mb-4 flex-grow overflow-auto max-h-[40vh]">
                <p className="text-gray-200 whitespace-pre-line">
                  {apodData.explanation.substring(0, 400)}...
                </p>
              </div>
              <a
                href="/apod"
                className="text-cyan-400 hover:text-cyan-200 font-semibold self-end"
              >
                Read more & explore dates →
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default FeaturedAPOD;
