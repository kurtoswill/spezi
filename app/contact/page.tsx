'use client';

import emailjs from 'emailjs-com';

import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';

const Page = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const isFormEmpty = !name.trim() || !email.trim() || !message.trim();

    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async () => {
        if (isFormEmpty || isSending) return;

        setIsSending(true);

        try {
            await emailjs.send(
                'service_yvr1d9t',
                'template_hpk5onh',
                { name, email, message },
                'bqE7v1hBf4yS-hT04'
            );

            toast.success('Message sent!');
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error('EmailJS Error:', error);
            toast.error('Failed to send message.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="max-w-[2000px] mx-auto flex items-start justify-center gap-52 mt-[60px] mb-32 px-4">
            {/* Left Side - Contact Form */}
            <div className="flex flex-col text-center gap-10 w-full max-w-md">
                <div className="flex flex-col gap-5">
                    <Image
                        src="/logos/spezi-logo-1.png"
                        alt="logo"
                        priority
                        width={60}
                        height={60}
                        className="self-center"
                    />

                    <h1 className="text-4xl font-bold text-[#232C4F]">
                        Let&#39;s talk, we&#39;re here to help.
                    </h1>

                    <p className="text-[#232C4F]">
                        Got questions, feedback, or want to partner with Spezi?
                        Whether you&#39;re an ESL professional, an organization, or just curious,
                        we’d love to hear from you.
                    </p>
                </div>

                <div className="text-left">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="Enter your name"
                        className="mb-5 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="mb-5 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        placeholder="Type your message"
                        className="w-full"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <Button
                        className="mt-10 w-full p-6"
                        variant={isFormEmpty ? "disabled" : "default"}
                        disabled={isFormEmpty}
                        onClick={handleSubmit}
                    >
                        {isSending ? "Sending..." : "Submit"}
                    </Button>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex justify-center items-start">
                <Image
                    src="/images/meetingOne.jpg"
                    alt="meeting image"
                    width={500}
                    height={520}
                    className="shadow-2xl rounded-lg"
                />
            </div>
        </div>
    );
};

export default Page;
