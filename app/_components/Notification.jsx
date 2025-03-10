"use client";

import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button"; // Adjust the import if needed

export default function NotificationSystem() {
  return (
    <div>
      <Toaster position="top-right" richColors /> {/* Notification Container */}
      <Button onClick={() => toast.success("Course added successfully!")}>
        Show Notification
      </Button>
    </div>
  );
}
