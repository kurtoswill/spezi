import { Button } from "./ui/button";
import Image from "next/image";

export const Download = () => {
  return (
    <div className="mt-25 -mx-6 md:-mx-24 lg:-mx-[150px] w-[100vw] bg-[#F9FAFB] flex flex-col gap-10 p-20 justify-center items-center text-center">
      <Image
        src="/logos/spezi-logo-1.png"
        alt="Spezi logo"
        width={100}
        height={100}
        priority
      />
      <div className="font-bold text-[40px]">Start Speaking Like a Pro</div>
        <p>Install Spezi and get your first feedback in under 2 minutes.</p>
          <Button 
            className="p-6"
            variant="default"
          >
            Download Extension
          </Button>
    </div>
  );
};
