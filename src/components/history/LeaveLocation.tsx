
import React from "react";
import { MapPin } from "lucide-react";

interface LeaveLocationProps {
  location: string;
}

export const LeaveLocation: React.FC<LeaveLocationProps> = ({ location }) => {
  return (
    <div className="flex items-start gap-2">
      <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
      <div>
        <div className="text-sm font-medium">{location}</div>
        <p className="text-xs text-muted-foreground">Location</p>
      </div>
    </div>
  );
};
