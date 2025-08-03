// Enhanced (dashboard) page.tsx with better UX
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Sessions } from "@/components/dashboard/Sessions";
import { Notifications } from "@/components/dashboard/Notifications";
import { Settings } from "@/components/dashboard/Settings";
import { Billing } from "@/components/dashboard/Billing";

const Tabs = [
    { id: "sessions", component: Sessions },
    { id: "notifications", component: Notifications },
    { id: "settings", component: Settings },
    { id: "billing", component: Billing },
];

const Page = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("sessions");
    const [isChecking, setIsChecking] = useState(true);
    const { user, loading } = useAuth();
    const router = useRouter();

    // Protect the (dashboard) route
    useEffect(() => {
        console.log('🛡️ Dashboard: Auth state check...', {
            user: user?.email,
            loading,
            hasUser: !!user
        });

        // Wait for auth to finish loading
        if (loading) {
            return;
        }

        // If no user after loading is complete, redirect
        if (!user) {
            console.log('🛡️ Dashboard: No authenticated user, redirecting to login');
            router.push('/login');
            return;
        }

        // User is authenticated
        console.log('🛡️ Dashboard: User authenticated, allowing access');
        setIsChecking(false);

    }, [user, loading, router]);

    // Show loading state while checking auth
    if (loading || isChecking) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#232C4F] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Don't render (dashboard) if no user (redirect in progress)
    if (!user) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    const currentTab = Tabs.find((tab) => tab.id === activeTab);

    return (
        <div className="flex h-screen w-full">
            <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
            <div className="flex-1 p-6 overflow-auto">
                {currentTab ? <currentTab.component /> : <div>Tab Not Found</div>}
            </div>
        </div>
    );
};

export default Page;