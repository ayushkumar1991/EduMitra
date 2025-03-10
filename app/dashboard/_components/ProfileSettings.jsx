"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const ProfileSettings = () => {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("I love learning and teaching.");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Profile Settings
      </h2>

      <div className="mb-4">
        <label className="text-gray-700 dark:text-gray-300">Name</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
          className="mt-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-700 dark:text-gray-300">Bio</label>
        <Input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={!isEditing}
          className="mt-1 w-full"
        />
      </div>

      <div className="flex items-center justify-between">
        {isEditing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}

        <div className="flex items-center gap-2">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
