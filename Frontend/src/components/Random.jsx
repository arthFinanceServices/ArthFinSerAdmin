import React, { useContext, useState } from "react";
import PassContext, { PassProvider } from "../context/PassContext";

const Random = ({ genearteRandomPass }) => {
  const { pass, setPass, code, setCode } = useContext(PassProvider);

  function generateDealerCode() {
    let randomCode = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "1234567890";
    const chooseAlpha = Math.floor(Math.random() * 26);
    randomCode += String(alphabet[chooseAlpha]);
    for (let i = 0; i < 9; i++) {
      const temp = Math.floor(Math.random() * 10);
      randomCode += number[temp];
    }
    setCode(randomCode);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border border-blue-100 p-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-blue-800 text-xl font-semibold mb-1">
          Password Generator
        </h2>
        <p className="text-blue-400 text-xs mb-4">
          Generate a secure random password
        </p>

        <input
          type="text"
          value={pass}
          readOnly
          placeholder="Your password..."
          className="w-full p-2 mb-4 rounded-lg bg-blue-50 text-blue-800 text-center outline-none border border-blue-200 placeholder:text-blue-300 font-mono tracking-widest"
        />

        <button
          onClick={genearteRandomPass}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2 rounded-lg transition-all duration-150 font-medium text-sm"
        >
          Generate Password
        </button>
      </div>

      {/* Dealer Code Card */}
      <div className="bg-white border border-blue-100 p-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-blue-800 text-xl font-semibold mb-1">
          Dealer Code
        </h2>
        <p className="text-blue-400 text-xs mb-4">
          Generate a unique dealer code
        </p>

        <input
          type="text"
          value={code}
          readOnly
          placeholder="Your dealer code..."
          className="w-full p-2 mb-4 rounded-lg bg-blue-50 text-blue-800 text-center outline-none border border-blue-200 placeholder:text-blue-300 font-mono tracking-widest"
        />

        <button
          onClick={generateDealerCode}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2 rounded-lg transition-all duration-150 font-medium text-sm"
        >
          Generate Dealer Code
        </button>
      </div>
    </div>
  );
};

export default Random;
