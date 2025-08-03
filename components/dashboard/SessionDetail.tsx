import { useState } from "react";
import { ArrowLeft, Search, Trash2, Clock, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock transcript data
const mockTranscript = [
  { time: "00:00", text: "Hello everyone, today I'm going to talk about the importance of effective communication in the workplace." },
  { time: "00:15", text: "Um, effective communication is essential for, you know, building strong relationships with colleagues and clients." },
  { time: "00:30", text: "It helps to, uh, prevent misunderstandings and ensures that everyone is on the same page." },
  { time: "00:45", text: "When we communicate clearly, we can, like, avoid conflicts and resolve issues more efficiently." },
  { time: "01:00", text: "Good communication also leads to increased productivity and better teamwork." },
  { time: "01:15", text: "Um, some key elements of effective communication include active listening, clarity, and conciseness." },
  { time: "01:30", text: "It's also important to, you know, be aware of non-verbal cues and to adapt your communication style to your audience." },
  { time: "01:45", text: "In conclusion, effective communication is a skill that can be developed with practice and awareness." },
  { time: "02:00", text: "Thank you for your attention, and I'm happy to answer any questions you might have." },
];

// Mock performance metrics
const mockPerformance = {
  overall: 78,
  pace: 85,
  tone: 72,
  fillerWords: 65,
  grammar: 90,
  fillerWordCount: 12,
  insights: "Your pace is excellent, but you could improve by reducing filler words like 'um' and 'you know'. Your tone is generally good but could be more varied for emphasis. Grammar is excellent with very few errors."
};

interface SessionDetailProps {
  sessionId: number;
  onBack: () => void;
}

export const SessionDetail = ({ sessionId, onBack }: SessionDetailProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number | null>(null);
  
  // Filter transcript based on search
  const filteredTranscript = searchQuery 
    ? mockTranscript.filter(item => 
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockTranscript;
  
  // Get metrics for selected time segment or use overall metrics
  const getMetricsForTimeSegment = (index: number | null) => {
    if (index === null) return mockPerformance;
    
    // In a real app, you would have specific metrics for each time segment
    // For this demo, we'll just modify the overall metrics slightly
    return {
      ...mockPerformance,
      pace: Math.min(100, mockPerformance.pace + (index % 3) * 5),
      tone: Math.max(50, mockPerformance.tone - (index % 2) * 8),
      fillerWords: Math.max(40, mockPerformance.fillerWords - (index % 4) * 10),
      fillerWordCount: index % 3 + 1,
      insights: index % 2 === 0 
        ? "This segment has good pacing but contains some filler words. Try to be more concise."
        : "Your tone is monotonous in this segment. Try varying your pitch for emphasis."
    };
  };
  
  const currentMetrics = getMetricsForTimeSegment(selectedTimeIndex);
  
  // Helper function to determine color based on score
  const getColorForScore = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };
  
  // Helper function to create circular progress indicator
  const CircularProgress = ({ value, label }: { value: number, label: string }) => {
    const circumference = 2 * Math.PI * 40; // r = 40
    const strokeDashoffset = circumference - (value / 100) * circumference;
    const colorClass = getColorForScore(value);
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={value >= 80 ? "#10b981" : value >= 60 ? "#f59e0b" : "#ef4444"}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            {/* Percentage text */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="18"
              fontWeight="bold"
              className={colorClass}
            >
              {value}%
            </text>
          </svg>
        </div>
        <span className="mt-2 text-sm font-medium">{label}</span>
      </div>
    );
  };
  
  return (
    <div className="w-full p-4 flex flex-col gap-6">
      {/* Header with breadcrumb and actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
            <ArrowLeft size={18} />
          </Button>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="hover:underline cursor-pointer" onClick={onBack}>My Sessions</span>
            <span>&gt;</span>
            <span className="font-medium text-gray-900">Session {sessionId}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50">
          <Trash2 size={16} />
          Delete Session
        </Button>
      </div>
      
      {/* Main content - 2 columns on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - Transcript */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Transcript</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download size={16} />
                Export
              </Button>
            </div>
          </div>
          
          {/* Transcript search */}
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search in transcript..." 
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Transcript content */}
          <div className="border rounded-lg overflow-hidden h-[500px] overflow-y-auto">
            <div className="divide-y">
              {filteredTranscript.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-3 flex hover:bg-gray-50 cursor-pointer ${selectedTimeIndex === index ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedTimeIndex(index === selectedTimeIndex ? null : index)}
                >
                  <div className="w-16 flex items-center">
                    <Clock size={14} className="text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
              
              {filteredTranscript.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p>No matching text found</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - Performance Overview */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">
            {selectedTimeIndex !== null 
              ? `Performance at ${mockTranscript[selectedTimeIndex].time}` 
              : 'Overall Performance'}
          </h2>
          
          {/* Circular progress indicators */}
          <div className="border rounded-lg p-6">
            <div className="flex justify-center mb-6">
              <CircularProgress value={currentMetrics.overall} label="Overall" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <CircularProgress value={currentMetrics.pace} label="Pace" />
              <CircularProgress value={currentMetrics.tone} label="Tone" />
              <CircularProgress value={currentMetrics.fillerWords} label="Filler Words" />
              <CircularProgress value={currentMetrics.grammar} label="Grammar" />
            </div>
            
            {selectedTimeIndex !== null && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="font-medium text-sm">Filler Word Count: {currentMetrics.fillerWordCount}</p>
              </div>
            )}
          </div>
          
          {/* Insights */}
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Insights & Recommendations</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Pro Feature</span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 relative overflow-hidden">
              <p className="text-sm text-gray-600">{currentMetrics.insights}</p>
              
              {/* Blur overlay for free users */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="font-bold text-gray-800 mb-2">Unlock Detailed Insights</p>
                  <p className="text-sm text-gray-600 mb-4">Upgrade to Pro to access personalized recommendations</p>
                  <Button size="sm">Upgrade to Pro</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};