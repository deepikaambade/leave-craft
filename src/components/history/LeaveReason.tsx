
import React from "react";
import { FileText } from "lucide-react";

interface LeaveReasonProps {
  reason: string;
}

export const LeaveReason: React.FC<LeaveReasonProps> = ({ reason }) => {
  return (
    <div className="flex items-start gap-2">
      <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
      <div>
        <div className="text-sm line-clamp-2">{reason}</div>
        <p className="text-xs text-muted-foreground">Reason</p>
      </div>
    </div>
  );
};
