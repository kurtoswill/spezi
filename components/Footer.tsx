import Image from "next/image";


export const Footer = () => {
    return (
        <footer className="my-16">
            <div className="flex gap-5 items-center justify-end">
                <Image src="/icons/fb.svg" alt="fb"
                       width={30} height={30}
                />
                <Image src="/icons/ig.svg" alt="fb"
                       width={30} height={30}
                />
                <Image src="/icons/linkedin.svg" alt="fb"
                       width={30} height={30}
                />
            </div>

            <hr
                className="border-black border-1 my-10"
            />

            <div className="flex justify-between font-thin">
                <div className="flex gap-5">
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                </div>

                <p>2025 Spezi All Rights Reserved.</p>
            </div>
        </footer>
    );
};