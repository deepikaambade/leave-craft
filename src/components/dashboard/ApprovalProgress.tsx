
import React from "react";
import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ApprovalProgressProps {
  approvals: {
    parent: boolean;
    dean: boolean;
    warden: boolean;
  };
}

export const ApprovalProgress: React.FC<ApprovalProgressProps> = ({ approvals }) => {
  // Calculate the progress percentage
  const approvalCount = Object.values(approvals).filter(Boolean).length;
  const totalApprovals = Object.keys(approvals).length;
  const progressPercent = (approvalCount / totalApprovals) * 100;

  // Get approval status for each stakeholder
  const getStatusIcon = (isApproved: boolean | null) => {
    if (isApproved === true) return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (isApproved === false) return <XCircle className="h-4 w-4 text-red-500" />;
    return <Circle className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-3">
      <Progress
        value={progressPercent}
        className="h-2"
      />
      
      <div className="grid grid-cols-3 gap-1 text-center text-xs">
        <div className={cn(
          "flex flex-col items-center space-y-1",
          approvals.parent ? "text-green-700" : "text-muted-foreground"
        )}>
          {getStatusIcon(approvals.parent)}
          <span>Parent</span>
        </div>
        
        <div className={cn(
          "flex flex-col items-center space-y-1",
          approvals.dean ? "text-green-700" : "text-muted-foreground"
        )}>
          {getStatusIcon(approvals.dean)}
          <span>Dean</span>
        </div>
        
        <div className={cn(
          "flex flex-col items-center space-y-1",
          approvals.warden ? "text-green-700" : "text-muted-foreground"
        )}>
          {getStatusIcon(approvals.warden)}
          <span>Warden</span>
        </div>
      </div>
    </div>
  );
};
