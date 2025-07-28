import Image from "next/image";

interface StepData {
  step: number;
  text: string;
  image: string;
}

interface InstructionsImageProps {
  currentStep: number;
  StepDataSet: StepData[];
}

export const InstructionsImage = ({
  currentStep,
  StepDataSet,
}: InstructionsImageProps) => {
  return (
    <div className="relative w-[500px] h-[300px] rounded-[10px] shadow-xl flex-shrink-0 overflow-hidden">
      {StepDataSet.map((stepData) => (
        <Image
          key={stepData.step}
          src={stepData.image}
          width={500}
          height={300}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in ${
            stepData.step === currentStep ? "opacity-100" : "opacity-0"
          }`}
          alt={`Step ${stepData.step}`}
        />
      ))}
    </div>
  );
};
