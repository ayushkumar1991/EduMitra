"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import ProfileSettings from "./_components/ProfileSettings"; 
import AddCourse from "./_components/AddCourse";
import NotificationSystem from "./_components/Notification";

function Dashboard() {
  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <UserButton />
      </div>

      {/* Notifications */}
      <NotificationSystem />

      {/* Profile Settings Section */}
      <ProfileSettings />

      {/* Add Course Section */}
      <AddCourse />
    </div>
  );
}

export default Dashboard;
