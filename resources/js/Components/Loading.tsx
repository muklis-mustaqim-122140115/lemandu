import React from "react";

// Define the props interface
interface LoadingProps {
  progress: number; // Specify that progress should be a number
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
   <div className="flex justify-center">
      <div className="w-full">
        <div className="min-h-screen bg-[url('/home_bg.png')] bg-no-repeat bg-center bg-cover bg-white flex justify-center">
        <div className="flex flex-col items-center justify-center text-[#5b2a3b]">
          <img src="/logo.png" alt="logo" width={300} height={300} />
            <h1 className="text-center text-5xl mt-4 font-bold">LEMANDU</h1>
            <h2 className="text-center text-3xl tracking-[0.4em] mt-4">
              LEMATANG POSYANDU
            </h2>

            <div className="w-[70vw] h-[30px] bg-[#D9D9D9] mt-4 rounded-full">
              <div
                className="h-[30px] w-full bg-red-300 rounded-full"
                style={{ width: `${progress}vw` }} // Set the width based on progress
              ></div>
            </div>
          </div>
        </div>
      </div>
   </div>
  );
};

export default Loading;