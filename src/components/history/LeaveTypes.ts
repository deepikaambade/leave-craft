
export interface LeaveApprovals {
  parent: boolean;
  dean: boolean;
  warden: boolean;
}

export interface Leave {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "approved" | "rejected" | "pending" | "draft";
  reason: string;
  location: string;
  createdAt: string;
  approvals: LeaveApprovals;
}
