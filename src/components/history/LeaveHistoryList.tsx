import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LeaveHistoryItem } from "./LeaveHistoryItem";
import { ArrowLeft, Calendar, CheckCheck, Clock, FileX, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Leave } from "./LeaveTypes";

export const LeaveHistoryList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  const leaveHistory: Leave[] = [
    {
      id: "L1001",
      type: "Medical",
      startDate: "2023-03-10",
      endDate: "2023-03-15",
      status: "approved",
      reason: "Had fever and needed rest",
      location: "Home",
      createdAt: "2023-03-08T10:00:00",
      approvals: {
        parent: true,
        dean: true,
        warden: true,
      },
    },
    {
      id: "L1002",
      type: "Vacation",
      startDate: "2023-02-01",
      endDate: "2023-02-05",
      status: "rejected",
      reason: "Family function",
      location: "Mumbai",
      createdAt: "2023-01-25T14:30:00",
      approvals: {
        parent: true,
        dean: false,
        warden: false,
      },
    },
    {
      id: "L1003",
      type: "Day Leave",
      startDate: "2023-01-15",
      endDate: "2023-01-15",
      status: "pending",
      reason: "Medical checkup",
      location: "City Hospital",
      createdAt: "2023-01-13T09:15:00",
      approvals: {
        parent: true,
        dean: true,
        warden: false,
      },
    },
    {
      id: "L1004",
      type: "Day Leave",
      startDate: "2023-04-05",
      endDate: "2023-04-05",
      status: "draft",
      reason: "Family event",
      location: "Home",
      createdAt: "2023-04-01T16:45:00",
      approvals: {
        parent: false,
        dean: false,
        warden: false,
      },
    },
    {
      id: "L1005",
      type: "Medical",
      startDate: "2023-05-20",
      endDate: "2023-05-25",
      status: "approved",
      reason: "Surgery recovery",
      location: "Home",
      createdAt: "2023-05-15T11:30:00",
      approvals: {
        parent: true,
        dean: true,
        warden: true,
      },
    },
  ];

  const filteredLeaves = leaveHistory.filter(leave => {
    if (activeTab === "all") return true;
    return leave.status === activeTab;
  });

  const counts = {
    all: leaveHistory.length,
    approved: leaveHistory.filter(leave => leave.status === "approved").length,
    rejected: leaveHistory.filter(leave => leave.status === "rejected").length,
    pending: leaveHistory.filter(leave => leave.status === "pending").length,
    draft: leaveHistory.filter(leave => leave.status === "draft").length,
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="mb-8 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leave History</h1>
          <p className="text-muted-foreground">
            View and manage all your leave requests
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Leave Requests</CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate("/apply")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </div>
          <CardDescription>
            Browse through all your leave requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="flex items-center justify-center space-x-2">
                <span>All</span>
                <Badge variant="secondary" className="ml-1">{counts.all}</Badge>
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center justify-center space-x-2">
                <CheckCheck className="mr-1 h-4 w-4 text-green-500" />
                <span>Approved</span>
                <Badge variant="secondary" className="ml-1">{counts.approved}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center justify-center space-x-2">
                <FileX className="mr-1 h-4 w-4 text-red-500" />
                <span>Rejected</span>
                <Badge variant="secondary" className="ml-1">{counts.rejected}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center justify-center space-x-2">
                <Clock className="mr-1 h-4 w-4 text-amber-500" />
                <span>In Process</span>
                <Badge variant="secondary" className="ml-1">{counts.pending}</Badge>
              </TabsTrigger>
              <TabsTrigger value="draft" className="flex items-center justify-center space-x-2">
                <PenLine className="mr-1 h-4 w-4 text-blue-500" />
                <span>Drafts</span>
                <Badge variant="secondary" className="ml-1">{counts.draft}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave) => (
                  <React.Fragment key={leave.id}>
                    <LeaveHistoryItem leave={leave} />
                    <Separator className="my-2" />
                  </React.Fragment>
                ))
              ) : (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8">
                  <p className="mb-2 text-center text-muted-foreground">
                    No leave requests found in this category
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/apply")}
                  >
                    Create New Request
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
