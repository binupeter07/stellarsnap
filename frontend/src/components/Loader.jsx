import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-[120px] h-[90px] mx-auto">
        {/* Bouncing ball */}
        <div
          className="absolute left-[50px] w-[30px] h-[30px] rounded-full bg-cyan-400"
          style={{
            bottom: "30px",
            animation: "loading-bounce 0.5s ease-in-out infinite alternate",
          }}
        ></div>

        {/* Steps */}
        <div
          className="absolute top-0 right-0 h-[7px] w-[45px] rounded-[4px]"
          style={{
            boxShadow:
              "0 5px 0 #e0f2f1, -35px 50px 0 #e0f2f1, -70px 95px 0 #e0f2f1",
            animation: "loading-step 1s ease-in-out infinite",
          }}
        ></div>
      </div>
      <style>{`
        @keyframes loading-bounce {
          0% { transform: scale(1, 0.7); }
          40% { transform: scale(0.8, 1.2); }
          60% { transform: scale(1, 1); }
          100% { bottom: 140px; }
        }

        @keyframes loading-step {
          0% {
            box-shadow: 0 10px 0 rgba(0, 0, 0, 0),
                        0 10px 0 #e0f2f1,
                        -35px 50px 0 #e0f2f1,
                        -70px 90px 0 #e0f2f1;
          }

          100% {
            box-shadow: 0 10px 0 #e0f2f1,
                        -35px 50px 0 #e0f2f1,
                        -70px 90px 0 #e0f2f1,
                        -70px 90px 0 rgba(0, 0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
