
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  CalendarDays,
  Clock,
  FileText,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  onProfileClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onProfileClick }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: CalendarDays, label: "Apply Leave", href: "/apply" },
    { icon: Clock, label: "History", href: "/history" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-sidebar">
      {/* Logo/App Name */}
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-xl font-semibold tracking-tight">LeaveEase</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-t p-4">
        <button
          onClick={onProfileClick}
          className="flex w-full items-center gap-3 rounded-md p-2 text-sm transition-colors hover:bg-sidebar-accent"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="font-medium">John Doe</span>
            <span className="text-xs text-sidebar-foreground/70">CS2022456</span>
          </div>
        </button>
      </div>
      
      {/* Logout Button */}
      <div className="p-4">
        <Link
          to="/login"
          className="flex w-full items-center gap-2 rounded-md bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground transition-colors hover:bg-sidebar-accent/80"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};
