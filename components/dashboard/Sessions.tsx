import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpDown, Trash2, Clock, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import _ from "lodash";
import { SessionDetail } from "./SessionDetail";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Enhanced mock sessions with more varied data
const mockSessions = [
    {
        id: 1,
        name: "Session 1",
        date: "Tuesday, July 29, 2025",
        time: "7:23 PM",
        duration: "23m",
        rating: 65,
        topic: "Team Meeting",
    },
    {
        id: 2,
        name: "Session 2",
        date: "Tuesday, July 29, 2025",
        time: "2:15 PM",
        duration: "45m",
        rating: 78,
        topic: "Client Presentation",
    },
    {
        id: 3,
        name: "Session 3",
        date: "Monday, July 28, 2025",
        time: "10:30 AM",
        duration: "15m",
        rating: 92,
        topic: "Daily Standup",
    },
    {
        id: 4,
        name: "Session 4",
        date: "Monday, July 28, 2025",
        time: "3:45 PM",
        duration: "30m",
        rating: 45,
        topic: "Interview Practice",
    },
    {
        id: 5,
        name: "Session 5",
        date: "Friday, July 25, 2025",
        time: "11:00 AM",
        duration: "60m",
        rating: 83,
        topic: "Conference Talk",
    },
];

export const Sessions = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
    const [selectedSessions, setSelectedSessions] = useState<number[]>([]);
    
    // If a session is selected, show the session detail view
    if (selectedSessionId !== null) {
        return (
            <SessionDetail 
                sessionId={selectedSessionId} 
                onBack={() => setSelectedSessionId(null)} 
            />
        );
    }
    
    // Filter sessions based on search query and filter selection
    const filteredSessions = mockSessions.filter(session => {
        const matchesSearch = 
            session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.topic.toLowerCase().includes(searchQuery.toLowerCase());
            
        if (selectedFilter === "all") return matchesSearch;
        if (selectedFilter === "high") return matchesSearch && session.rating >= 80;
        if (selectedFilter === "medium") return matchesSearch && session.rating >= 60 && session.rating < 80;
        if (selectedFilter === "low") return matchesSearch && session.rating < 60;
        return matchesSearch;
    });
    
    // Sort sessions based on sort order
    const sortedSessions = _.orderBy(
        filteredSessions, 
        [session => new Date(`${session.date} ${session.time}`).getTime()], 
        [sortOrder]
    );
    
    // Group sessions by date
    const groupedSessions = _.groupBy(sortedSessions, "date");
    
    // Get sorted dates
    const sortedDates = Object.keys(groupedSessions).sort(
        (a, b) => sortOrder === "desc" 
            ? new Date(b).getTime() - new Date(a).getTime()
            : new Date(a).getTime() - new Date(b).getTime()
    );
    
    // Toggle session selection
    const toggleSessionSelection = (id: number) => {
        if (selectedSessions.includes(id)) {
            setSelectedSessions(selectedSessions.filter(sessionId => sessionId !== id));
        } else {
            setSelectedSessions([...selectedSessions, id]);
        }
    };
    
    // Delete selected sessions
    const deleteSelectedSessions = () => {
        // In a real app, this would call an API to delete the sessions
        // For this demo, we'll just clear the selection
        setSelectedSessions([]);
    };
    
    // Helper function to get color class based on rating
    const getRatingColorClass = (rating: number) => {
        if (rating >= 80) return "bg-green-500";
        if (rating >= 60) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="w-full p-4 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Sessions</h1>
                <div className="flex items-center gap-2">
                    {selectedSessions.length > 0 && (
                        <Button 
                            variant="outline" 
                            className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                            onClick={deleteSelectedSessions}
                        >
                            <Trash2 size={16} />
                            Delete Selected
                        </Button>
                    )}
                </div>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                        type="text" 
                        placeholder="Search sessions..." 
                        className="pl-10 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                {/* Filter */}
                <div className="w-full md:w-48">
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                        <SelectTrigger className="w-full">
                            <div className="flex items-center gap-2">
                                <Filter size={16} />
                                <span>Filter</span>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Ratings</SelectItem>
                            <SelectItem value="high">High Rating (80%+)</SelectItem>
                            <SelectItem value="medium">Medium Rating (60-79%)</SelectItem>
                            <SelectItem value="low">Low Rating (Below 60%)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                {/* Sort */}
                <div className="w-full md:w-48">
                    <Button 
                        variant="outline" 
                        className="w-full flex justify-between items-center"
                        onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                    >
                        <div className="flex items-center gap-2">
                            <ArrowUpDown size={16} />
                            <span>{sortOrder === "desc" ? "Newest First" : "Oldest First"}</span>
                        </div>
                    </Button>
                </div>
            </div>
            
            {/* Sessions List */}
            <div className="flex flex-col w-full gap-6">
                {sortedDates.map((date) => {
                    const sessions = groupedSessions[date];

                    return (
                        <div key={date} className="flex flex-col gap-3">
                            {/* Date Header */}
                            <div className="flex items-center gap-2 bg-gray-100 p-3 border-b border-gray-200 rounded-t-lg">
                                <Calendar size={16} className="text-gray-500" />
                                <h3 className="text-md font-semibold text-gray-700">
                                    {date}
                                </h3>
                            </div>

                            {/* Sessions for the given date */}
                            <div className="flex flex-col gap-2">
                                {sessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex w-full justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedSessionId(session.id)}
                                    >
                                        <div className="flex gap-4 items-center">
                                            <Checkbox 
                                                className="border-gray-400" 
                                                checked={selectedSessions.includes(session.id)}
                                                onCheckedChange={() => {
                                                    toggleSessionSelection(session.id);
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1 text-gray-500">
                                                    <Clock size={14} />
                                                    <span className="text-sm">{session.duration}</span>
                                                </div>
                                                <span className="text-sm text-gray-600">{session.time}</span>
                                                <span className="font-medium">{session.name}</span>
                                                <span className="text-sm text-gray-600">- {session.topic}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-1 items-end">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm text-gray-600">
                                                    Rating: {session.rating}%
                                                </p>
                                                <div className={`w-3 h-3 rounded-full ${getRatingColorClass(session.rating)}`}></div>
                                            </div>
                                            <Progress
                                                value={session.rating}
                                                className="w-32 h-2"
                                                indicatorClassName={getRatingColorClass(session.rating)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
                
                {/* If no sessions found */}
                {sortedDates.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500 border rounded-lg">
                        <p className="text-lg">No sessions found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};