
import React from "react";
import { LeaveStatusCard } from "./LeaveStatusCard";
import { LeaveTrendsChart } from "./LeaveTrendsChart";
import { ApprovalProgress } from "./ApprovalProgress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Calendar, Clock, History } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardPage: React.FC = () => {
  // Mock data
  const recentLeaves = [
    {
      id: "L123",
      type: "Medical",
      startDate: "2023-07-15",
      endDate: "2023-07-18",
      status: "approved",
      approvals: {
        parent: true,
        dean: true,
        warden: true,
      },
    },
    {
      id: "L122",
      type: "Vacation",
      startDate: "2023-06-01",
      endDate: "2023-06-10",
      status: "approved",
      approvals: {
        parent: true,
        dean: true,
        warden: true,
      },
    },
    {
      id: "L121",
      type: "Day Leave",
      startDate: "2023-05-20",
      endDate: "2023-05-20",
      status: "rejected",
      approvals: {
        parent: true,
        dean: false,
        warden: false,
      },
    },
  ];

  const pendingLeave = {
    id: "L124",
    type: "Vacation",
    startDate: "2023-08-10",
    endDate: "2023-08-15",
    status: "pending",
    approvals: {
      parent: true,
      dean: true,
      warden: false,
    },
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <header>
        <div className="flex flex-col space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">
            Your leave dashboard and status overview
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Hostel: H6-302
            </div>
            <div className="rounded-lg bg-muted px-3 py-1 text-sm font-medium">
              CS2022456
            </div>
          </div>
          <Link to="/apply">
            <Button className="group transition-all duration-300">
              <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
              Apply for Leave
            </Button>
          </Link>
        </div>
      </header>

      {/* Pending Leave Status Card */}
      {pendingLeave && (
        <div className="animate-scale-in">
          <LeaveStatusCard leave={pendingLeave} />
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Leaves Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Recent Leaves</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeaves.slice(0, 3).map((leave) => (
                <div
                  key={leave.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{leave.type}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                    </span>
                  </div>
                  <div
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      leave.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : leave.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {leave.status}
                  </div>
                </div>
              ))}
              <Link
                to="/history"
                className="flex items-center justify-center text-sm text-primary hover:underline"
              >
                <History className="mr-1 h-3 w-3" />
                View Full History
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Leave Trends Chart */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Leave Trends</CardTitle>
            <CardDescription>Your leave patterns over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[220px]">
            <LeaveTrendsChart />
          </CardContent>
        </Card>

        {/* Upcoming Leave Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {pendingLeave ? (
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="mb-2 font-medium">{pendingLeave.type} Leave</div>
                  <div className="mb-3 text-sm text-muted-foreground">
                    {formatDate(pendingLeave.startDate)} - {formatDate(pendingLeave.endDate)}
                  </div>
                  <ApprovalProgress approvals={pendingLeave.approvals} />
                </div>
              </div>
            ) : (
              <div className="flex h-[140px] flex-col items-center justify-center space-y-3 rounded-md border border-dashed p-8">
                <p className="text-center text-sm text-muted-foreground">
                  No upcoming leaves scheduled
                </p>
                <Link to="/apply">
                  <Button variant="outline" size="sm">
                    Apply Now
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
