
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ProfileSidebar } from "../profile/ProfileSidebar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex h-full overflow-hidden bg-background">
      {/* Main Sidebar */}
      <Sidebar onProfileClick={() => setIsProfileOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-6 transition-all duration-300 ease-in-out">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>

      {/* Profile Sidebar - Slides in from right */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-30 w-80 transform overflow-y-auto bg-card shadow-xl transition-transform duration-300 ease-in-out",
          isProfileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="absolute left-0 top-4 -translate-x-full">
          <button
            onClick={() => setIsProfileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-l-md bg-primary text-primary-foreground"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <ProfileSidebar onClose={() => setIsProfileOpen(false)} />
      </div>

      {/* Backdrop for mobile */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
};
