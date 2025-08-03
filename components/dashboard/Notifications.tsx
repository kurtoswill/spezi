import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Mail, MailOpen, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const mockNotifications = [
    {
        id: 0,
        topic: "Spezi Discount",
        preview: "Spezi is offering a discount of 20% on all Pro plans until the end of the month.",
        date: { dayName: "Tuesday", day: "28", month: "July", year: "2025" },
        read: true,
        time: "7:23 PM",
    },
    {
        id: 1,
        topic: "Session is ready for review",
        preview: "Your recent session has been analyzed and is ready for your review. Check out your performance insights.",
        date: { dayName: "Tuesday", day: "28", month: "July", year: "2025" },
        read: false,
        time: "7:23 PM",
    },
    {
        id: 2,
        topic: "Weekly Progress Report",
        preview: "Here's your weekly progress report. You've improved your speaking pace by 15% since last week.",
        date: { dayName: "Monday", day: "27", month: "July", year: "2025" },
        read: false,
        time: "10:15 AM",
    },
    {
        id: 3,
        topic: "New Feature Announcement",
        preview: "We've added new features to help you improve your speaking skills. Check them out!",
        date: { dayName: "Friday", day: "24", month: "July", year: "2025" },
        read: true,
        time: "2:45 PM",
    },
    {
        id: 4,
        topic: "Account Security Alert",
        preview: "We noticed a login from a new device. If this wasn't you, please secure your account.",
        date: { dayName: "Wednesday", day: "22", month: "July", year: "2025" },
        read: true,
        time: "9:30 AM",
    },
];

export const Notifications = () => {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Filter notifications based on search query
    const filteredNotifications = notifications.filter(
        (notif) => 
            notif.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
            notif.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Handle checkbox selection
    const toggleSelection = (id: number) => {
        if (selectedNotifications.includes(id)) {
            setSelectedNotifications(selectedNotifications.filter(notifId => notifId !== id));
        } else {
            setSelectedNotifications([...selectedNotifications, id]);
        }
    };
    
    // Handle select all
    const toggleSelectAll = () => {
        if (selectedNotifications.length === filteredNotifications.length) {
            setSelectedNotifications([]);
        } else {
            setSelectedNotifications(filteredNotifications.map(notif => notif.id));
        }
    };
    
    // Handle delete selected
    const deleteSelected = () => {
        setNotifications(notifications.filter(notif => !selectedNotifications.includes(notif.id)));
        setSelectedNotifications([]);
    };
    
    return (
        <div className="w-full p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <div className="flex items-center gap-2">
                    {selectedNotifications.length > 0 && (
                        <Button 
                            variant="outline" 
                            className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                            onClick={deleteSelected}
                        >
                            <Trash2 size={16} />
                            Delete Selected
                        </Button>
                    )}
                </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                    type="text" 
                    placeholder="Search notifications..." 
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            {/* Notifications List */}
            <div className="border rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center">
                    <Checkbox 
                        className="mr-4" 
                        checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                        onCheckedChange={toggleSelectAll}
                    />
                    <div className="flex-1 font-medium text-gray-700">Message</div>
                    <div className="w-24 text-right font-medium text-gray-700">Date</div>
                </div>
                
                {/* Notification Items */}
                <div className="divide-y">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notif) => (
                            <div 
                                key={notif.id} 
                                className={`p-3 flex items-center hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}
                            >
                                <Checkbox 
                                    className="mr-4" 
                                    checked={selectedNotifications.includes(notif.id)}
                                    onCheckedChange={() => toggleSelection(notif.id)}
                                />
                                <div className="mr-3">
                                    {notif.read ? (
                                        <MailOpen className="text-gray-400" size={18} />
                                    ) : (
                                        <Mail className="text-blue-500" size={18} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-medium ${!notif.read ? 'text-blue-800' : ''}`}>{notif.topic}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-1">{notif.preview}</p>
                                </div>
                                <div className="text-sm text-gray-500 whitespace-nowrap">
                                    {notif.date.month} {notif.date.day}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                            <AlertCircle className="mb-2" size={24} />
                            <p>No notifications found</p>
                            {searchQuery && (
                                <p className="text-sm mt-1">Try a different search term</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};