// app/(dashboard)/layout.tsx - Clean layout for dashboard (no navbar/footer)
'use client'

import { Toaster } from "react-hot-toast"

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full bg-gray-50">
            <Toaster position="top-center" />
            <main className="h-screen w-full">
                {children}
            </main>
        </div>
    )
}