'use client'

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-center" />
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}