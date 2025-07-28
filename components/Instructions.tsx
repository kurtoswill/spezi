"use client";
import { InView } from "react-intersection-observer";
import { useState, useEffect, useRef, SetStateAction } from "react";
import { InstructionSteps } from "./InstructionSteps";
import { InstructionsImage } from "./InstructionsImage";

interface StepData {
  step: number;
  text: string;
  image: string;
}

const StepDataSet: StepData[] = [
  { step: 1, text: "Install extension", image: "/images/placeholder2.png" },
  { step: 2, text: "Start a call", image: "/images/placeholder.jpg" },
  {
    step: 3,
    text: "Receive real-time feedback",
    image: "/images/placeholder2.png",
  },
];

export const Instructions = () => {
  const [stepProgress, setStepProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepClicked, setIsStepClicked] = useState(false);
  const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isStepClicked) return;
    if (!isVisible) clearTimeoutState(); // clear if on unmount or out of view
    else {
      if (stepProgress > 100) {
        setCurrentStep((prev) => prev + 1);
        setStepProgress(0);
      }

      clearTimeoutState();
      setTimeoutState(
        setTimeout(() => {
          setStepProgress((prev) => prev + 1);
        }, 50)
      );
    }
  }, [stepProgress, isVisible]);

  useEffect(() => {
    if (currentStep > 3) setCurrentStep(1);
  }, [currentStep]);

  const clearTimeoutState = () => {
    if (timeoutState) {
      clearTimeout(timeoutState);
      setTimeoutState(null);
    }
  };

  const handleStepClick = (step: SetStateAction<number>) => {
    if (!isStepClicked) {
      clearTimeoutState();
      setIsStepClicked(true);
    }
    setStepProgress(100);
    setCurrentStep(step);
  };

  return (
    <InView as="div" onChange={(inView) => setIsVisible(inView)}>
      <div className="text-[40px] mt-40 mb-10 max-w-[500px] font-bold leading-tight text-center mx-auto">
        How Spezi Works in Your Browser
      </div>
      <div className="flex flex-col lg:flex-row justify-between content-between">
        <InstructionSteps
          currentStep={currentStep}
          stepProgress={stepProgress}
          handleStepClick={handleStepClick}
          StepDataSet={StepDataSet}
        />
        <InstructionsImage
          currentStep={currentStep}
          StepDataSet={StepDataSet}
        />
      </div>
    </InView>
  );
};

export default Instructions;
