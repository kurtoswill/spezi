import { Pencil, Search, Globe, Briefcase, Mic, ExternalLink, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export const Settings = () => {
    const { user } = useAuth();
    const firstName = user?.user_metadata?.first_name || 'User';
    const lastName = user?.user_metadata?.last_name || '';
    const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName;
    
    return (
        <div className="w-full p-4 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Account Settings</h1>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                    type="text" 
                    placeholder="Search settings..." 
                    className="pl-10 w-full"
                />
            </div>
            
            {/* Personalization Section */}
            <div className="border rounded-lg overflow-hidden">
                <h2 className="text-md font-semibold text-gray-700 bg-gray-100 p-4 border-b border-gray-200">
                    Personalization
                </h2>
                <div className="divide-y">
                    {/* Display Name */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Display Name</h3>
                            <p className="text-sm text-gray-600">{fullName}</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Pencil size={14} /> Edit
                        </Button>
                    </div>
                    
                    {/* Nationality */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Nationality</h3>
                            <p className="text-sm text-gray-600">Filipino</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Globe size={14} /> Edit
                        </Button>
                    </div>
                    
                    {/* Language/Dialect */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Language/Dialect</h3>
                            <p className="text-sm text-gray-600">Ilocano</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Pencil size={14} /> Edit
                        </Button>
                    </div>
                    
                    {/* Profession */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Profession</h3>
                            <p className="text-sm text-gray-600">Software Developer</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Briefcase size={14} /> Edit
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Recording Preferences */}
            <div className="border rounded-lg overflow-hidden">
                <h2 className="text-md font-semibold text-gray-700 bg-gray-100 p-4 border-b border-gray-200">
                    Recording Preferences
                </h2>
                <div className="divide-y">
                    {/* Pacing */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Track Pacing</h3>
                            <p className="text-sm text-gray-600">Monitor your speaking speed</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    
                    {/* Tone */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Track Tone</h3>
                            <p className="text-sm text-gray-600">Analyze voice tone and inflection</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    
                    {/* Filler Words */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Track Filler Words</h3>
                            <p className="text-sm text-gray-600">Count "um", "uh", "like", etc.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    
                    {/* Grammar */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Track Grammar</h3>
                            <p className="text-sm text-gray-600">Identify grammatical errors</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </div>
            </div>
            
            {/* Integrations */}
            <div className="border rounded-lg overflow-hidden">
                <h2 className="text-md font-semibold text-gray-700 bg-gray-100 p-4 border-b border-gray-200">
                    Integrations
                </h2>
                <div className="divide-y">
                    {/* Google Meet */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Google Meet</h3>
                            <p className="text-sm text-gray-600">Not connected</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ExternalLink size={14} /> Connect
                        </Button>
                    </div>
                    
                    {/* Zoom */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Zoom</h3>
                            <p className="text-sm text-gray-600">Not connected</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ExternalLink size={14} /> Connect
                        </Button>
                    </div>
                    
                    {/* Microsoft Teams */}
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">Microsoft Teams</h3>
                            <p className="text-sm text-gray-600">Not connected</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ExternalLink size={14} /> Connect
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Browser Permissions */}
            <div className="border rounded-lg overflow-hidden">
                <h2 className="text-md font-semibold text-gray-700 bg-gray-100 p-4 border-b border-gray-200">
                    Browser Permissions
                </h2>
                <div className="p-4">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <Mic className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                            <h3 className="font-medium text-blue-800">Microphone Access</h3>
                            <p className="text-sm text-blue-700">
                                Microphone access is required for Spezi to analyze your speech.
                            </p>
                            <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                                Allow Microphone Access
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};