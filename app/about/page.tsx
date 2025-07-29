import React from "react";
import Image from "next/image";
// import { Button } from "@/components/ui/button";

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
  avatar?: string;
  socialLinks?: SocialLinks;
}

const TeamMember = ({ name, role, avatar, socialLinks }: TeamMemberProps) => {
  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 text-center">
      <div className="w-full h-auto mx-auto mb-4 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={96}
            height={96}
            className="w-full h-full object-cover rounded-lg"
            unoptimized
          />
        ) : (
          <span className="text-white text-2xl font-semibold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-[#232C4F] mb-1">{name}</h3>

      {/* Role */}
      <p className="text-sm text-gray-600 mb-4">{role}</p>

      {/* Social Links */}
      <div className="flex justify-center gap-5">
        {socialLinks?.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#232C4F] transition-colors"
          >
            <Image src="/icons/fb.svg" alt="Facebook" width={20} height={20} />
          </a>
        )}
        {socialLinks?.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#232C4F] transition-colors"
          >
            <Image src="/icons/ig.svg" alt="Instagram" width={20} height={20} />
          </a>
        )}
        {socialLinks?.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#232C4F] transition-colors"
          >
            <Image
              src="/icons/linkedin.svg"
              alt="LinkedIn"
              width={20}
              height={20}
            />
          </a>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  const teamMembers = [
    {
      name: "Kurt Oswill McCarver",
      role: "Developer",
      avatar: "/images/kurt.jpeg",
      socialLinks: {
        facebook: "https://facebook.com/kurt.mccarver",
        instagram: "https://instagram.com/kurt.mccarver",
        linkedin: "https://linkedin.com/in/kurt-mccarver",
      },
    },
    {
      name: "Niles Tristan Cabrera",
      role: "Developer",
      avatar: "/images/placeholder.jpg",
      socialLinks: {
        facebook: "https://facebook.com/niles.cabrera",
        instagram: "https://instagram.com/niles.cabrera",
        linkedin: "https://linkedin.com/in/niles-cabrera",
      },
    },
    {
      name: "Gianfranco Lobaton",
      role: "Business Lead",
      avatar: "/images/placeholder.jpg",
      socialLinks: {
        facebook: "https://facebook.com/gianfranco.lobaton",
        instagram: "https://instagram.com/gianfranco.lobaton",
        linkedin: "https://linkedin.com/in/gianfranco-lobaton",
      },
    },
    {
      name: "Verah Janae Dulay",
      role: "Researcher | Designer",
      avatar: "/images/placeholder.jpg",
      socialLinks: {
        facebook: "https://facebook.com/verah.dulay",
        instagram: "https://instagram.com/verah.dulay",
        linkedin: "https://linkedin.com/in/verah-dulay",
      },
    },
    {
      name: "Kazel Arwen Tuazon",
      role: "UI/UX Lead | Researcher",
      avatar: "/images/placeholder.jpg",
      socialLinks: {
        facebook: "https://facebook.com/kazel.tuazon",
        instagram: "https://instagram.com/kazel.tuazon",
        linkedin: "https://linkedin.com/in/kazel-tuazon",
      },
    },
  ];

  return (
    <div className="mb- flex flex-col gap-10 lg:gap-52">
      <header>
        <div className="font-extrabold font-sora text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl leading-tight text-center max-w-4xl mx-auto">
          Behind Spezi: The People, Purpose, and Principles
        </div>
        <div className="flex flex-col text-center mt-5 lg:flex-row lg:text-left lg:mt-18 justify-center gap-8 lg:gap-40 items-center">
          <div className="flex gap-5 flex-col max-w-2xl">
            <div className="font-bold text-[35px] lg:text-[40px]">About Us</div>
            <p className="text-base sm:text-lg leading-relaxed">
              <b>Spezi</b> is a browser-based communication assistant built
              specifically for{" "}
              <b>English as a Second Language (ESL) professionals.</b> We
              believe that great ideas shouldn’t be lost in translation — that’s
              why we created a tool that supports confident, clear communication
              during and after your online meetings. Whether you’re pitching to
              clients, collaborating with global teams, or leading virtual
              classrooms,<b>Spezi gives you real-time and post-call feedback</b>{" "}
              tailored to your unique voice, accent, and communication style.
              We’re a small, passionate team of developers, designers, and
              language learners committed to making global communication more
              inclusive and empowering for everyone
            </p>
          </div>
          <Image
            src="/images/placeholder.jpg"
            width={400}
            height={300}
            className="w-[350px] h-[262.5px] lg:w-[400px] lg:h-[300px] object-cover rounded-[10px] shadow-xl flex-shrink-0"
            alt="placeholder"
            unoptimized
          />
        </div>
      </header>
      <section className="flex flex-col-reverse lg:flex-row justify-center gap-8 lg:gap-40 items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/images/placeholder.jpg"
            width={280}
            height={540}
            className="w-[130px] h-[262px]  lg:w-[200px] lg:h-[390px] object-cover rounded-[10px] shadow-xl"
            alt=""
            unoptimized
          />
          <Image
            src="/images/placeholder.jpg"
            width={280}
            height={461}
            className="w-[130px] h-[220px] lg:w-[200px] lg:h-[350px] object-cover rounded-[10px] shadow-xl"
            alt=""
            unoptimized
          />
        </div>
        <div className="flex gap-5 flex-col max-w-2xl text-center lg:text-left shrink-[3]">
          <div className="font-bold text-[35px] lg:text-[40px]">Vision</div>
          <p className="text-base sm:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="font-bold text-[35px] lg:text-[40px]">Mission</div>
          <p className="text-base sm:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 md:gap-16 lg:gap-24 xl:gap-32 px-4 sm:px-6">
        <div className="flex flex-col gap-5 max-w-2xl text-center lg:text-left">
          <h1 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold">
            Our Story
          </h1>
          <p className="text-base sm:text-lg leading-relaxed">
            Spezi was born out of countless stories from Filipino professionals
            and OFWs who felt silenced in virtual rooms not because they lacked
            skill, but because they lacked support.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            We started this project after seeing how language gaps affected job
            performance, team dynamics, and even self-esteem in global remote
            work environments. From hackathons to research-based prototypes, we
            crafted Spezi to be an accessible, real-time coaching tool — no
            seminars or expensive lessons required.
          </p>
        </div>

        <Image
          src="/images/placeholder.jpg"
          width={400}
          height={300}
          className="w-full max-w-sm object-cover rounded-[10px] shadow-xl"
          alt="Our Story"
        />
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-[40px] font-bold text-[#232C4F] mb-4">
            Meet Our Team
          </h2>
          <p className="max-w-2xl mx-auto">
            The passionate individuals behind Spezi who are dedicated to
            empowering Filipino professionals worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              avatar={member.avatar}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
