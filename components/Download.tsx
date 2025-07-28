import { Button } from "./ui/button";
import Image from "next/image";

export const Download = () => {
  return (
    <div
      className="mt-25 -mx-6 md:-mx-24 lg:-mx-[150px] w-[100vw] bg-[#F9FAFB] 
    justify-center items-center flex-shrink-0"
    >
      <div className="flex flex-col gap-4 px-2 py-20 sm:py-40 justify-center items-center text-center">
        <Image
          src="/logos/spezi-logo-1.png"
          alt="Spezi logo"
          width={100}
          height={100}
          priority
          className="w-[50px] h-[50px] sm:min-w-[100px] sm:min-h-[100px] flex-shrink-0"
        />
        <div className="font-bold text-sm sm:text-[35px] lg:text-[40px]">
          Start Speaking Like a Pro
        </div>
        <p className="text-sm sm:text-base">
          Install Spezi and get your first feedback in under 2 minutes.
        </p>
        <Button className="p-7 mt-4 hover:bg-[#11141f]">
          Download Extension
        </Button>
      </div>
    </div>
  );
};
