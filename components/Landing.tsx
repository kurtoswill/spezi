import { Button } from "./ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const Landing = () => {
  return (
    <div className="flex justify-between gap-10 items-center">
      <div className="flex flex-col gap-4">
        <div className="font-extrabold font-sora text-3xl">
          Speak English Professionally and Confidently
        </div>
        <p>
          Built for English as a Second Language (ESL) professionals, Spezi
          gives you real-time, accent-aware feedback to help you communicate
          clearly in global meetings.
        </p>
        <div className="flex gap-3">
          <Button className="p-7 hover:bg-[#11141f]">Download Extension</Button>
          <Button className="p-7 border hover:bg-[#dadada] hover:border-white border-[#232C4F] bg-white text-[#232C4F]">
            Watch Demo <ArrowRight />
          </Button>
        </div>
        <p className="text-xs">
          Trusted by professionals across 20+ countries{" "}
        </p>
      </div>
      <div className="flex-shrink-0 flex items-center gap-3">
        <Image
          src="/images/placeholder.jpg"
          width={280}
          height={461}
          className="w-[200px] h-[350px] object-cover rounded-[10px] shadow-xl flex-shrink-0 "
          alt=""
        />
        <Image
          src="/images/placeholder.jpg"
          width={280}
          height={540}
          className="w-[200px] h-[390px] object-cover rounded-[10px] shadow-xl flex-shrink-0"
          alt=""
        />
      </div>
    </div>
  );
};
