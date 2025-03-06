
import React from "react";
import { ApprovalProgress } from "@/components/dashboard/ApprovalProgress";
import { LeaveStatus } from "./LeaveStatus";
import { LeaveDate } from "./LeaveDate";
import { LeaveLocation } from "./LeaveLocation";
import { LeaveReason } from "./LeaveReason";
import { LeaveActions } from "./LeaveActions";
import { Leave } from "./LeaveTypes";

interface LeaveHistoryItemProps {
  leave: Leave;
}

export const LeaveHistoryItem: React.FC<LeaveHistoryItemProps> = ({ leave }) => {
  return (
    <div className="rounded-lg hover:bg-muted/30 p-2">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Leave Information */}
        <div className="space-y-3 md:w-7/12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LeaveStatus status={leave.status} />
              <span className="ml-2 font-medium">{leave.type} Leave</span>
            </div>
            <span className="text-xs text-muted-foreground">ID: {leave.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <LeaveDate 
              startDate={leave.startDate} 
              endDate={leave.endDate} 
              createdAt={leave.createdAt} 
            />
            <LeaveLocation location={leave.location} />
          </div>

          <LeaveReason reason={leave.reason} />
        </div>

        {/* Approval Progress and Actions */}
        <div className="flex flex-col space-y-3 md:w-5/12">
          {leave.status !== "draft" && (
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Approval Status</p>
              <ApprovalProgress approvals={leave.approvals} />
            </div>
          )}

          <LeaveActions id={leave.id} status={leave.status} />
        </div>
      </div>
    </div>
  );
};
