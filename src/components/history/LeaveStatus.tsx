
import React from "react";
import { CheckCheck, FileX, Clock, PenLine } from "lucide-react";

type StatusType = "approved" | "rejected" | "pending" | "draft";

interface LeaveStatusProps {
  status: StatusType;
}

export const LeaveStatus: React.FC<LeaveStatusProps> = ({ status }) => {
  const getStatusIcon = () => {
    switch (status) {
      case "approved":
        return <CheckCheck className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <FileX className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "draft":
        return <PenLine className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "pending":
        return "In Process";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "draft":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor()}`}>
      {getStatusIcon()}
      <span className="ml-1">{getStatusText()}</span>
    </span>
  );
};
