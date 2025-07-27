import React from 'react';
import Image from "next/image";

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
                    />
                ) : (
                    <span className="text-white text-2xl font-semibold">
                        {name.split(' ').map(n => n[0]).join('')}
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
                        <Image src="/icons/fb.svg" alt="Facebook"
                               width={20} height={20}
                        />
                    </a>
                )}
                {socialLinks?.instagram && (
                    <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#232C4F] transition-colors"
                    >
                        <Image src="/icons/ig.svg" alt="Instagram"
                               width={20} height={20}
                        />
                    </a>
                )}
                {socialLinks?.linkedin && (
                    <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#232C4F] transition-colors"
                    >
                        <Image src="/icons/linkedin.svg" alt="LinkedIn"
                               width={20} height={20}
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
            avatar: "/images/placeholder.jpg",
            socialLinks: {
                facebook: "https://facebook.com/kurt.mccarver",
                instagram: "https://instagram.com/kurt.mccarver",
                linkedin: "https://linkedin.com/in/kurt-mccarver"
            }
        },
        {
            name: "Niles Tristan Cabrera",
            role: "Developer",
            avatar: "/images/placeholder.jpg",
            socialLinks: {
                facebook: "https://facebook.com/niles.cabrera",
                instagram: "https://instagram.com/niles.cabrera",
                linkedin: "https://linkedin.com/in/niles-cabrera"
            }
        },
        {
            name: "Gianfranco Lobaton",
            role: "Business Lead",
            avatar: "/images/placeholder.jpg",
            socialLinks: {
                facebook: "https://facebook.com/gianfranco.lobaton",
                instagram: "https://instagram.com/gianfranco.lobaton",
                linkedin: "https://linkedin.com/in/gianfranco-lobaton"
            }
        },
        {
            name: "Verah Janae Dulay",
            role: "Researcher | Designer",
            avatar: "/images/placeholder.jpg",
            socialLinks: {
                facebook: "https://facebook.com/verah.dulay",
                instagram: "https://instagram.com/verah.dulay",
                linkedin: "https://linkedin.com/in/verah-dulay"
            }
        },
        {
            name: "Kazel Arwen Tuazon",
            role: "UI/UX Lead | Researcher",
            avatar: "/images/placeholder.jpg",
            socialLinks: {
                facebook: "https://facebook.com/kazel.tuazon",
                instagram: "https://instagram.com/kazel.tuazon",
                linkedin: "https://linkedin.com/in/kazel-tuazon"
            }
        }
    ];

    return (
        <div className="text-[#232C4F] px-4 mb-52">
            {/* Our Story Section */}
            <div className="flex mt-52 items-center justify-between gap-12">
                <div className="flex gap-5 flex-col max-w-2xl">
                    <h1 className="text-[40px] font-bold">
                        Our Story
                    </h1>
                    <p>
                        Spezi was born out of countless stories from Filipino professionals and OFWs who felt silenced in virtual rooms not because they lacked skill, but because they lacked support.
                    </p>
                    <p>
                        We started this project after seeing how language gaps affected job performance, team dynamics, and even self-esteem in global remote work environments. From hackathons to research-based prototypes, we crafted Spezi to be an accessible, real-time coaching tool  no seminars or expensive lessons required.
                    </p>
                </div>

                <div className="w-[600px] h-[400px] bg-[#232C4F] rounded-[10px] shadow-xl flex-shrink-0">
                    {/*Image Placeholder*/}
                </div>
            </div>

            {/* Team Section */}
            <div className="mt-24 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-[40px] font-bold text-[#232C4F] mb-4">Meet Our Team</h2>
                    <p className="max-w-2xl mx-auto">
                        The passionate individuals behind Spezi who are dedicated to empowering Filipino professionals worldwide
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