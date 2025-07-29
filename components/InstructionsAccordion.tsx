import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { VerticalProgress } from "./ui/vertical-progress";

interface StepData {
  step: number;
  text: string;
  image: string;
}

interface InstructionStepsProps {
  stepProgress: number;
  currentStep: number;
  handleStepClick: (step: number) => void;
  StepDataSet: StepData[];
}

export const InstructionsAccordion = ({
  stepProgress,
  currentStep,
  handleStepClick,
  StepDataSet,
}: InstructionStepsProps) => {
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={currentStep.toString()}
      >
        {StepDataSet.map((stepData) => {
          const isActive = stepData.step === currentStep;
          const progressValue = isActive ? stepProgress : 0;

          return (
            <AccordionItem value={stepData.step.toString()}>
              <AccordionTrigger
                onClick={() => handleStepClick(stepData.step)}
                className="flex items-center justify-start h-20"
              >
                <VerticalProgress
                  value={progressValue}
                  className="transition-all duration-200 ease-in w-1"
                />
                {stepData.text}
              </AccordionTrigger>
              <AccordionContent>
                <Image
                  src={stepData.image}
                  width={500}
                  height={300}
                  className={"w-[500px] h-[300px] object-cover mx-auto"}
                  alt={`Step ${stepData.step}`}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};
