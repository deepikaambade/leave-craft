
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ApprovalProgress } from "./ApprovalProgress";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  FileText, 
  MoreVertical, 
  Phone, 
  MessageSquare, 
  Trash2,
  BadgeCheck
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Leave {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  approvals: {
    parent: boolean;
    dean: boolean;
    warden: boolean;
  };
  location?: string;
  reason?: string;
}

interface LeaveStatusCardProps {
  leave: Leave;
}

export const LeaveStatusCard: React.FC<LeaveStatusCardProps> = ({ leave }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate days until a date
  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilStart = getDaysUntil(leave.startDate);
  
  return (
    <Card className="overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex items-center justify-between bg-card p-4">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                leave.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : leave.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {leave.status}
            </span>
            <span className="text-sm font-medium">{leave.type} Leave</span>
            {leave.status === "approved" && (
              <div className="flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                <BadgeCheck className="mr-1 h-3 w-3" />
                Approved
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>Call Incharge</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Send Message</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Cancel Request</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">
                  {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                </div>
                {daysUntilStart > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Starting in {daysUntilStart} days
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{leave.location || "New Delhi"}</div>
                <p className="text-xs text-muted-foreground">Location</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium line-clamp-2">
                  {leave.reason || "Family function and personal reasons"}
                </div>
                <p className="text-xs text-muted-foreground">Reason</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">Approval Progress</p>
              <ApprovalProgress approvals={leave.approvals} />
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              
              {leave.status === "pending" && (
                <Button size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Reminder
                </Button>
              )}
              
              {leave.status === "approved" && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Show at Gate
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
