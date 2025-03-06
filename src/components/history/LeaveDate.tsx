
import React from "react";
import { Calendar } from "lucide-react";

interface LeaveDateProps {
  startDate: string;
  endDate: string;
  createdAt: string;
}

export const LeaveDate: React.FC<LeaveDateProps> = ({ startDate, endDate, createdAt }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex items-start gap-2">
      <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
      <div>
        <div className="text-sm font-medium">
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>
        <p className="text-xs text-muted-foreground">
          Created on {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
