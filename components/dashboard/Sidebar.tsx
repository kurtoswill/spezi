import { Camera, Bell, Settings, CreditCard, Loader2 } from "lucide-react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Define types for sidebar items
interface SidebarItem {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
}

// Define types for sidebar props
interface SidebarProps {
    setActiveTab: (tab: string) => void;
    activeTab: string;
}

// Define types for usage data
interface UsageData {
    usageCount: number;
    usageLimit: number;
    subscriptionTier: string;
}

const SidebarItems: SidebarItem[] = [
    { id: "sessions", name: "My Sessions", icon: Camera },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "settings", name: "Account Settings", icon: Settings },
    { id: "billing", name: "Billing", icon: CreditCard },
];

export const Sidebar = ({ setActiveTab, activeTab }: SidebarProps) => {
    const { user, loading: authLoading } = useAuth();
    const [usageData, setUsageData] = useState<UsageData>({
        usageCount: 0,
        usageLimit: 5,
        subscriptionTier: 'free'
    });
    const [loading, setLoading] = useState(true);
    
    // Fetch user usage data from the database
    useEffect(() => {
        const fetchUsageData = async () => {
            if (!user) return;
            
            try {
                // Get user data from the database
                const { data, error } = await supabase
                    .from('users')
                    .select('usage_count, subscription_tier')
                    .eq('id', user.id)
                    .single();
                
                if (error) {
                    console.error('Error fetching user data:', error);
                    return;
                }
                
                // Get subscription tier data
                const { data: tierData, error: tierError } = await supabase
                    .from('subscription_tiers')
                    .select('features')
                    .eq('id', data.subscription_tier || 'free')
                    .single();
                
                if (tierError) {
                    console.error('Error fetching subscription tier:', tierError);
                    return;
                }
                
                // Parse the features JSON to get the usage limit
                const features = tierData.features;
                const usageLimit = features.usage_limit || 5;
                
                setUsageData({
                    usageCount: data.usage_count || 0,
                    usageLimit,
                    subscriptionTier: data.subscription_tier || 'free'
                });
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsageData();
    }, [user]);
    
    // Ensure My Sessions is always the first active page
    useEffect(() => {
        if (!activeTab) {
            setActiveTab("sessions");
        }
    }, [activeTab, setActiveTab]);

    // Get user data from auth context
    const firstName = user?.user_metadata?.first_name || 'User';
    const lastName = user?.user_metadata?.last_name || '';
    const email = user?.email || 'user@example.com';
    const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName;

    // Show loading state if auth is still loading or we're fetching usage data
    if (authLoading || (loading && user)) {
        return (
            <div className="flex flex-col w-64 h-screen justify-between border-r border-gray-300 items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    <p className="text-sm text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-64 h-screen justify-between border-r border-gray-300">
            <div className="flex flex-col gap-6 p-4 overflow-y-auto">
                {/* Spezi Logo */}
                <div className="flex justify-center py-2">
                    <Image 
                        src="/images/logo.png" 
                        alt="Spezi Logo" 
                        width={120} 
                        height={40}
                        className="h-10 w-auto"
                    />
                </div>
                
                {/* Navigation Items */}
                {SidebarItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center p-3 ${
                            activeTab === item.id ? "bg-[#93cceb] rounded-xl" : "hover:bg-gray-100"
                        } gap-3 cursor-pointer transition-colors`}
                    >
                        <item.icon className="text-gray-700" />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
            <div className="flex flex-col p-4 gap-4 border-t border-gray-200">
                <div className="border border-gray-300 rounded-lg flex flex-col gap-3 p-4">
                    <span className="font-medium">
                        Plan Usage - {usageData.subscriptionTier === 'pro' ? 'Pro' : 'Free'}
                    </span>
                    <p className="text-sm text-gray-600">
                        {usageData.usageCount} out of {usageData.usageLimit === null ? 'Unlimited' : usageData.usageLimit}
                    </p>
                    <Progress 
                        value={usageData.usageLimit ? (usageData.usageCount / usageData.usageLimit) * 100 : 0} 
                        className={usageData.usageLimit === null ? 'bg-green-100' : ''}
                    />
                    {usageData.subscriptionTier !== 'pro' && (
                        <Button className="w-full">Upgrade Plan</Button>
                    )}
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <Image
                        src={user?.user_metadata?.avatar_url || "/images/placeholder2.jpg"}
                        width={42}
                        height={42}
                        className="w-[42px] h-[42px] object-cover rounded-full shadow-md"
                        alt="Profile Picture"
                        onError={(e) => {
                            // Fallback if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/placeholder2.jpg";
                        }}
                    />
                    <div className="flex flex-col flex-1">
                        <p className="font-medium">{fullName}</p>
                        <p className="text-sm text-gray-600 truncate">{email}</p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                </div>
            </div>
        </div>
    );
};