"use client";
import { useState } from "react";
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