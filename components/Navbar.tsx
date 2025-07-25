import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
}

const NavbarItem = ({
    href,
    children
}: NavbarItemProps) => {
    return (
        <Button
            asChild
            className="text-base"
            variant={"link"}
        >
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}

const NavbarItems = [
    {href: "/", children: "Home"},
    {href: "#features", children: "Features"},
    {href: "#pricing", children: "Pricing"},
    {href: "/contact", children: "Contact"},
    {href: "/about", children: "About Us"},
]

export const Navbar = () => {
    return (
        <div className="flex justify-between items-center sticky px-8 md:px-32 lg:px-[200px] shadow py-5">
            {/*Logo*/}
            <Image
                src="/logos/spezi-logo-2.png"
                alt="Spezi logo"
                width={100} height={100}
                priority
            />

            {/*NavLinks*/}
            <nav role="navigation" aria-label="Main navigation">
                {NavbarItems.map((item) => (
                    <NavbarItem
                        key={item.href}
                        href={item.href}
                    >
                        {item.children}
                    </NavbarItem>
                ))}
            </nav>

            <Button
                variant={"default"}
                className="p-6"
            >
                Download Extension
            </Button>
        </div>
    );
};

