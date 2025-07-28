"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  handleLinkClick?: () => void;
}

const NavbarItem = ({ href, children, handleLinkClick }: NavbarItemProps) => {
  return (
    <Button
      asChild
      className="text-base"
      variant={"link"}
      onClick={handleLinkClick}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const NavbarItems = [
  { href: "/", children: "Home" },
  { href: "#features", children: "Features" },
  { href: "#pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
  { href: "/about", children: "About Us" },
];

export const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleTriggerClick = () => {
    setIsSheetOpen((prev) => (prev = !prev));
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <div
        className={`${
          isSheetOpen ? "flex" : "hidden"
        } flex-col fixed items-start pt-30 pb-15 px-6 w-[100vw] h-[100vh] inset-0 bg-white z-10 justify-between`}
      >
        <div className="flex flex-col gap-5 items-start">
          {NavbarItems.map((item) => (
            <NavbarItem
              key={item.href}
              href={item.href}
              handleLinkClick={handleLinkClick}
            >
              {item.children}
            </NavbarItem>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-full">
          <Button variant={"outline"} className="w-full p-7">
            Sign in
          </Button>
          <Button variant={"default"} className="w-full p-7">
            Download Extension
          </Button>
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 bg-white flex justify-between items-center px-8 md:px-32 lg:px-[200px] shadow py-5">
        {/*Logo*/}
        <Link href="/">
          <Image
            src="/logos/spezi-logo-2.png"
            alt="Spezi logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/*NavLinks*/}
        <div className="hidden lg:flex lg:items-center">
          <nav role="navigation" aria-label="Main navigation">
            {NavbarItems.map((item) => (
              <NavbarItem
                key={item.href}
                href={item.href}
                handleLinkClick={handleLinkClick}
              >
                {item.children}
              </NavbarItem>
            ))}
          </nav>

          <div className="flex gap-5">
            <Button variant={"outline"} className="p-[22px]">
              Sign in
            </Button>
            <Button variant={"default"} className="p-6">
              Download Extension
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:hidden" onClick={handleTriggerClick}>
          {isSheetOpen ? <X /> : <AlignJustify />}
        </div>
      </div>
    </>
  );
};
