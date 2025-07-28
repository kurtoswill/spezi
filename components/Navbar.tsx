import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
}

const NavbarItem = ({ href, children }: NavbarItemProps) => {
  return (
    <Button asChild className="text-base" variant={"link"}>
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
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white flex justify-between items-center px-8 md:px-32 lg:px-[200px] shadow py-5">
      {/*Logo*/}
      <Image
        src="/logos/spezi-logo-2.png"
        alt="Spezi logo"
        width={100}
        height={100}
        priority
      />

      {/*NavLinks*/}
      <div className="hidden lg:flex lg:items-center">
        <nav role="navigation" aria-label="Main navigation">
          {NavbarItems.map((item) => (
            <NavbarItem key={item.href} href={item.href}>
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
      <div className="flex lg:hidden">
        {/* <Sheet>
          <SheetTrigger>
            <AlignJustify />
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet> */}
      </div>
    </div>
  );
};
