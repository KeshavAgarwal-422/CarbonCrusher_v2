import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../Context";

const Introduction = () => {
  const nav = useNavigate();
  const { transportMode } = useStateContext(); // Use the context

  useEffect(() => {}, [transportMode]);
  return (
    <div className="w-full h-full flex flex-col mt-[14vw] items-center justify-start">
      <div className="h-[10vw] w-[20vw] rounded-3xl bg-[#272727] flex justify-center items-center text-[4vw]">
        {transportMode}
      </div>
      <div className="mt-[45vw] text-center">
        <h1 className="text-[10vw]">CarbonCrusher</h1>
        <span className="text-[3.5vw]">
          Reshaping the Future, Sustaining the Earth
        </span>
        <div className="mt-[40vw]">
          <button
            type="button"
            onClick={() => nav("/login")}
            className="bg-[#CFFF0F] px-[6vw] py-[3vw] text-[4vw] font-bold rounded-3xl text-black"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
