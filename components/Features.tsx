export const Features = () => {
    return (
        <div className="text-[#232C4F] mt-40  mx-auto px-6">
            <div className="flex flex-col gap-5 items-center text-center mb-40">
                <h1 className="text-[40px] font-bold leading-tight">
                    Enhance How You Speak, Effortlessly
                </h1>
                <p className="text-lg max-w-2xl">
                    Spezi gives instant, in-meeting feedback to help you speak clearer and more confidently — no coach required.
                </p>
            </div>

            <div className="space-y-32">
                {/* Real-time feedback */}
                <div className="flex justify-between items-center">
                    <div className="max-w-2xl flex flex-col gap-6">
                        <h2 className="text-[40px] font-bold leading-tight">
                            Real-time feedback
                        </h2>
                        <p className="text-lg leading-relaxed">
                            Get live, in-the-moment feedback on how you speak — from detecting filler words and awkward pauses to evaluating pacing and tone. Spezi personalizes its feedback based on your regional accent and ESL level, offering simple, practical tips as you speak. No need to rewatch recordings or attend extra training — just plug in and improve naturally during every conversation.
                        </p>
                    </div>

                    <div className="w-[520px] h-[320px] bg-gradient-to-br from-[#4A5B8C] to-[#232C4F] rounded-xl flex-shrink-0">
                        {/*Real-time feedback visualization*/}
                    </div>
                </div>

                {/* Post-meeting recaps */}
                <div className="flex justify-between items-center">
                    <div className="w-[520px] h-[320px] bg-gradient-to-br from-[#4A5B8C] to-[#232C4F] rounded-xl flex-shrink-0">
                        {/*Post-meeting recaps visualization*/}
                    </div>

                    <div className="max-w-2xl flex flex-col gap-6">
                        <h2 className="text-[40px] font-bold leading-tight">
                            Post-meeting recaps
                        </h2>
                        <p className="text-lg leading-relaxed">
                            After each meeting, Spezi generates a detailed yet easy-to-understand summary of your communication performance. You'll get targeted suggestions on pronunciation, clarity, delivery, and pacing. These recaps help you identify specific areas for improvement and track your progress over time, without needing to sift through full recordings.
                        </p>
                    </div>
                </div>

                {/* Trend tracking overtime */}
                <div className="flex justify-between items-center">
                    <div className="max-w-2xl flex flex-col gap-6">
                        <h2 className="text-[40px] font-bold leading-tight">
                            Trend tracking overtime
                        </h2>
                        <p className="text-lg leading-relaxed">
                            See how your speaking patterns and habits are improving in areas like confidence, pacing, grammar, and clarity. It visualizes your progress through easy-to-read charts and offers ESL-specific insights that guide your learning journey. This allows you to stay motivated and focused as you see how your communication skills evolve with each session.
                        </p>
                    </div>

                    <div className="w-[520px] h-[320px] bg-gradient-to-br from-[#4A5B8C] to-[#232C4F] rounded-xl flex-shrink-0">
                        {/*Trend tracking visualization*/}
                    </div>
                </div>

                {/* Personalized improvement plans */}
                <div className="flex justify-between items-center">
                    <div className="w-[520px] h-[320px] bg-gradient-to-br from-[#4A5B8C] to-[#232C4F] rounded-xl flex-shrink-0">
                        {/*Personalized improvement plans visualization*/}
                    </div>

                    <div className="max-w-2xl flex flex-col gap-6">
                        <h2 className="text-[40px] font-bold leading-tight">
                            Personalized improvement plans
                        </h2>
                        <p className="text-lg leading-relaxed">
                            Spezi creates tailored improvement plans based on your performance in each recorded session. These plans include practical exercises, pronunciation tips, and speaking strategies that focus on your unique challenges as an ESL speaker. By addressing specific areas like clarity, fluency, and confidence, the app helps you grow steadily and goals more effectively in professional settings.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};