
import React from "react";
import { Calendar, MapPin, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { differenceInDays } from "date-fns";

interface LeaveReport {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  returnDate: string | null;
  returnedOnTime: boolean;
  status: "completed" | "ongoing" | "late";
  reason: string;
  location: string;
}

interface ReportItemProps {
  report: LeaveReport;
}

export const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not returned yet";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getDuration = () => {
    const start = new Date(report.startDate);
    const end = new Date(report.endDate);
    const days = differenceInDays(end, start) + 1;
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  const getStatusBadge = () => {
    switch (report.status) {
      case "completed":
        return (
          <div className="flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Returned On Time
          </div>
        );
      case "late":
        return (
          <div className="flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Late Return
          </div>
        );
      case "ongoing":
        return (
          <div className="flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
            <Clock className="mr-1 h-3 w-3" />
            Ongoing
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg hover:bg-muted/30 p-3">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Report Information */}
        <div className="space-y-3 md:w-7/12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2 font-medium">{report.type} Leave</span>
              {getStatusBadge()}
            </div>
            <span className="text-xs text-muted-foreground">ID: {report.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">
                  {formatDate(report.startDate)} - {formatDate(report.endDate)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Duration: {getDuration()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{report.location}</div>
                <p className="text-xs text-muted-foreground">Location</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm line-clamp-2">
                {report.returnDate ? (
                  <span>
                    Returned on {formatDate(report.returnDate)}
                    {report.status === "late" && (
                      <span className="ml-1 text-red-600 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Late return
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-amber-600">Not yet returned</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Return Status</p>
            </div>
          </div>
        </div>

        {/* Reason and Actions */}
        <div className="flex flex-col space-y-3 md:w-5/12">
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">Reason</p>
            <p className="text-sm">{report.reason}</p>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm">
              View Full Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
