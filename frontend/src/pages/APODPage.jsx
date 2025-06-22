import { useState, useEffect } from "react";
import apiService from "../services/ApiService";
import LoadingIndicator from "../components/common/LoadingIndicator";

const APODPage = () => {
  const [apodData, setApodData] = useState(null);
  // Calculate today's date once at component initialization, normalized to start of day
  const getTodayNormalized = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayNormalized);
  const [dateToFetch, setDateToFetch] = useState(getTodayNormalized);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate the maximum date (today) in YYYY-MM-DD format for the input field
  const maxDate = (() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  })();

  // APOD started on June 16, 1995
  const minDate = "1995-06-16";

  // Helper to format Date objects to YYYY-MM-DD in local time
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Effect to validate selectedDate and set dateToFetch
  useEffect(() => {
    const today = getTodayNormalized();
    const minD = new Date(minDate);
    minD.setHours(0, 0, 0, 0); // Normalize minDate to start of day

    let newDateToFetch = selectedDate;

    // If selectedDate is in the future, set it to today
    if (selectedDate.getTime() > today.getTime()) {
      newDateToFetch = today;
    }
    // If selectedDate is before minDate, set it to minDate
    else if (selectedDate.getTime() < minD.getTime()) {
      newDateToFetch = minD;
    }

    // Only update dateToFetch if it's different to prevent unnecessary API calls
    if (dateToFetch.getTime() !== newDateToFetch.getTime()) {
      setDateToFetch(newDateToFetch);
    }
  }, [selectedDate, minDate, dateToFetch]); // Depend on selectedDate and minDate

  // Effect to fetch APOD data based on the validated dateToFetch
  useEffect(() => {
    const loadAPODData = async () => {
      try {
        setIsLoading(true);
        const formattedDate = formatDateToYYYYMMDD(dateToFetch);
        const response = await apiService.getAPOD(formattedDate);
        setApodData(response);
        setError(null);
      } catch (err) {
        // If it's a 404 (Not Found) error, show specific message
        if (err.status === 404) {
          setError(
            "NASA hasn't uploaded the Astronomy Picture of the Day for this date yet. Please try again later or select a previous date."
          );
        } else {
          // For other errors, show the API message or a generic one
          setError(
            err.message ||
              `Failed to load APOD for date ${formatDateToYYYYMMDD(
                dateToFetch
              )}. Please try another date.`
          );
        }
        setApodData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAPODData();
  }, [dateToFetch]); // Removed attemptedFallback from dependency

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    newDate.setHours(0, 0, 0, 0); // Normalize to start of selected day
    setSelectedDate(newDate);
  };

  const handlePreviousDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    prevDay.setHours(0, 0, 0, 0); // Normalize to start of previous day

    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0); // Normalize to start of next day

    setSelectedDate(nextDay);
  };

  return (
    <div className="min-h-screen ">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-200 mb-4 text-center">
          Astronomy Picture of the Day
        </h1>

        {/* Date selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <button
            onClick={handlePreviousDay}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
            disabled={formatDateToYYYYMMDD(selectedDate) === minDate}
          >
            <i className="fas fa-chevron-left mr-2"></i>
            Previous Day
          </button>

          <div className="bg-[#1A1C2C] p-2 rounded-lg border border-[#23244a]">
            <input
              type="date"
              min={minDate}
              max={maxDate}
              value={formatDateToYYYYMMDD(selectedDate)}
              onChange={handleDateChange}
              className="bg-[#181929] text-white py-1 px-2 rounded border border-[#23244a] focus:outline-none focus:border-cyan-400 transition-colors duration-200 shadow-sm"
              style={{ colorScheme: "dark", WebkitColorScheme: "dark" }}
            />
          </div>

          <button
            onClick={handleNextDay}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
            disabled={formatDateToYYYYMMDD(selectedDate) === maxDate}
          >
            Next Day
            <i className="fas fa-chevron-right ml-2"></i>
          </button>
        </div>

        {/* APOD Content */}
        <div className="bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] rounded-2xl shadow-lg overflow-hidden border border-[#23244a] transition-all duration-300 group hover:border-cyan-400 hover:shadow-[0_0_32px_#00d1ff55]">
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
                ) : apodData.media_type === "video" ? (
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
                ) : (
                  <div className="flex items-center justify-center h-64 bg-slate-700 rounded w-full">
                    <p className="text-gray-400">Media type not supported</p>
                  </div>
                )}
              </div>

              <div className="w-full lg:w-2/5 p-6 flex flex-col">
                <h2 className="text-3xl font-bold text-cyan-200 mb-4">
                  {apodData.title}
                </h2>
                <p className="text-gray-400 mb-4">
                  {new Date(apodData.date).toLocaleDateString()}
                </p>

                <div className="bg-[#23244a]/60 rounded p-4 mb-4 flex-grow overflow-auto max-h-[50vh] lg:max-h-[60vh]">
                  <p className="text-gray-200 whitespace-pre-line">
                    {apodData.explanation}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 text-sm">
                    {apodData.copyright && (
                      <div className="bg-[#23244a] px-3 py-1 rounded-full">
                        <span className="text-gray-400">© </span>
                        <span className="text-gray-200">
                          {apodData.copyright}
                        </span>
                      </div>
                    )}
                    {apodData.media_type && (
                      <div className="bg-[#23244a] px-3 py-1 rounded-full">
                        <span className="text-gray-400">Type: </span>
                        <span className="text-gray-200">
                          {apodData.media_type}
                        </span>
                      </div>
                    )}
                    {apodData.service_version && (
                      <div className="bg-[#23244a] px-3 py-1 rounded-full">
                        <span className="text-gray-400">Version: </span>
                        <span className="text-gray-200">
                          {apodData.service_version}
                        </span>
                      </div>
                    )}
                  </div>

                  {apodData.hdurl && (
                    <a
                      href={apodData.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-[#181929] text-white py-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] hover:scale-105 hover:shadow-[0_0_16px_#00d1ff99] hover:border-cyan-400 border border-[#23244a]"
                    >
                      <i className="fas fa-download mr-2"></i>
                      View High Resolution
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-400">No data available</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>
            The Astronomy Picture of the Day provides a daily image or
            photograph of our fascinating universe, along with a brief
            explanation written by a professional astronomer.
          </p>
          <p className="mt-2">
            The archive dates back to June 16, 1995, when APOD started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default APODPage;
