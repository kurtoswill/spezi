// app/(main)/layout.tsx - Use your updated ClientLayout component
'use client'

import { ClientLayout } from "../client-layout"

export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <ClientLayout>
            {children}
        </ClientLayout>
    )
}