
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Download, Filter, Search, FileCheck, FileX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ReportItem } from "./ReportItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Define the leave report interface
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

export const LeaveReports: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for leave reports
  const leaveReports: LeaveReport[] = [
    {
      id: "R1001",
      type: "Medical",
      startDate: "2023-03-10",
      endDate: "2023-03-15",
      returnDate: "2023-03-15",
      returnedOnTime: true,
      status: "completed",
      reason: "Had fever and needed rest",
      location: "Home",
    },
    {
      id: "R1002",
      type: "Vacation",
      startDate: "2023-04-01",
      endDate: "2023-04-10",
      returnDate: "2023-04-12",
      returnedOnTime: false,
      status: "late",
      reason: "Family function and vacation",
      location: "Mumbai",
    },
    {
      id: "R1003",
      type: "Day Leave",
      startDate: "2023-05-15",
      endDate: "2023-05-15",
      returnDate: "2023-05-15",
      returnedOnTime: true,
      status: "completed",
      reason: "Medical checkup",
      location: "City Hospital",
    },
    {
      id: "R1004",
      type: "Medical",
      startDate: "2023-06-20",
      endDate: "2023-06-25",
      returnDate: null,
      returnedOnTime: false,
      status: "ongoing",
      reason: "Surgery recovery",
      location: "Home",
    },
    {
      id: "R1005",
      type: "Vacation",
      startDate: "2023-07-05",
      endDate: "2023-07-15",
      returnDate: "2023-07-15",
      returnedOnTime: true,
      status: "completed",
      reason: "Summer vacation",
      location: "Hometown",
    },
  ];

  // Filter reports based on active tab and search term
  const filteredReports = leaveReports.filter(report => {
    const matchesTab = activeTab === "all" || report.status === activeTab;
    const matchesSearch = 
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  // Count reports by status
  const counts = {
    all: leaveReports.length,
    completed: leaveReports.filter(report => report.status === "completed").length,
    ongoing: leaveReports.filter(report => report.status === "ongoing").length,
    late: leaveReports.filter(report => report.status === "late").length,
  };

  const handleExportData = () => {
    toast.success("Report data exported successfully");
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
          <h1 className="text-2xl font-bold tracking-tight">Leave Reports</h1>
          <p className="text-muted-foreground">
            Track and analyze your leave patterns
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Leave Reports</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
          <CardDescription>
            View detailed reports of your leave history and return status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by type, location, or reason..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="flex items-center justify-center space-x-2">
                <span>All</span>
                <Badge variant="secondary" className="ml-1">{counts.all}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center justify-center space-x-2">
                <FileCheck className="mr-1 h-4 w-4 text-green-500" />
                <span>Returned On Time</span>
                <Badge variant="secondary" className="ml-1">{counts.completed}</Badge>
              </TabsTrigger>
              <TabsTrigger value="late" className="flex items-center justify-center space-x-2">
                <FileX className="mr-1 h-4 w-4 text-red-500" />
                <span>Late Return</span>
                <Badge variant="secondary" className="ml-1">{counts.late}</Badge>
              </TabsTrigger>
              <TabsTrigger value="ongoing" className="flex items-center justify-center space-x-2">
                <Clock className="mr-1 h-4 w-4 text-amber-500" />
                <span>Ongoing</span>
                <Badge variant="secondary" className="ml-1">{counts.ongoing}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredReports.length > 0 ? (
                filteredReports.map((report, index) => (
                  <React.Fragment key={report.id}>
                    <ReportItem report={report} />
                    {index < filteredReports.length - 1 && <Separator className="my-2" />}
                  </React.Fragment>
                ))
              ) : (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8">
                  <p className="mb-2 text-center text-muted-foreground">
                    No reports found matching your criteria
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Filters
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
