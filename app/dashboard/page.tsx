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
    <div className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-24 2xl:-mx-32 -mt-11 mb-5 flex">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div>
        {currentTab ? <currentTab.component /> : <div>Tab Not Found</div>}
      </div>
    </div>
  );
};

export default Page;
