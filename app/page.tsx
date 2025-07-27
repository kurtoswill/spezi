"use client";

import React, { useState, useEffect } from "react";
import { Landing } from "@/components/Landing";
import { Instructions } from "@/components/Instructions";
import { Download } from "@/components/Download";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";

const DevelopmentPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 rounded-full p-3">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-[#232C4F] mb-3">
            Under Development
          </h3>
          <p className="text-[#232C4F] mb-6 leading-relaxed">
            This project is still under development. Some features may not be
            working correctly or may be incomplete. Thank you for your patience
            as we continue to improve Spezi!
          </p>
          <button
            onClick={onClose}
            className="bg-[#232C4F] hover:scale-105 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenDevelopmentPopup");
    if (!hasSeenPopup) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("hasSeenDevelopmentPopup", "true");
  };

  return (
    <>
      <DevelopmentPopup isOpen={showPopup} onClose={handleClosePopup} />

      <div>
        <Landing />
        <Features />
        <Instructions />
        <Pricing />
        <Download />
      </div>
    </>
  );
}
