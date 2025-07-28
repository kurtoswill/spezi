import { Button } from "./ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const Landing = () => {
  return (
    <div className="mt-2 flex flex-col lg:flex-row justify-between gap-10 items-center">
      <div className="flex flex-col text-center items-center justify-center lg:items-start lg:justify-start lg:text-left gap-4">
        <div className="font-extrabold font-sora text-3xl">
          Speak English Professionally and Confidently
        </div>
        <p>
          Built for English as a Second Language (ESL) professionals, Spezi
          gives you real-time, accent-aware feedback to help you communicate
          clearly in global meetings.
        </p>
        <div className="flex gap-3">
          <Button className=" px-3 py-7 lg:px-7 text-xs sm:text-base hover:bg-[#11141f]">
            Download Extension
          </Button>
          <Button className=" px-3 py-7 lg:px-7 text-xs sm:text-base border hover:bg-[#dadada] hover:border-white border-[#232C4F] bg-white text-[#232C4F]">
            Watch Demo <ArrowRight />
          </Button>
        </div>
        <p className="text-xs hidden lg:flex">
          Trusted by professionals across 20+ countries{" "}
        </p>
      </div>
      <div className="flex items-center flex-shrink-0 gap-3">
        <Image
          src="/images/placeholder.jpg"
          width={280}
          height={461}
          className="w-[120px] h-[210px] sm:w-[150px] sm:h-[240px] lg:w-[200px] lg:h-[350px] object-cover rounded-[10px] shadow-xl "
          alt=""
        />
        <Image
          src="/images/placeholder.jpg"
          width={280}
          height={540}
          className="w-[120px] h-[240px] sm:w-[150px] sm:h-[280px] lg:w-[200px] lg:h-[390px] object-cover rounded-[10px] shadow-xl"
          alt=""
        />
      </div>
      <p className="text-xs flex lg:hidden">
        Trusted by professionals across 20+ countries{" "}
      </p>
    </div>
  );
};
