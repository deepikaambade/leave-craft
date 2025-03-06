
import React, { useState } from "react";
import { DateRangePicker } from "./DateRangePicker";
import { LeaveTypeSelector } from "./LeaveTypeSelector";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, SendHorizonal, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const LeaveApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  const [selectedLeaveType, setSelectedLeaveType] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select a date range for your leave");
      return;
    }
    
    if (!selectedLeaveType) {
      toast.error("Please select a leave type");
      return;
    }
    
    if (!location.trim()) {
      toast.error("Please enter your location during leave");
      return;
    }
    
    if (!reason.trim()) {
      toast.error("Please provide a reason for your leave");
      return;
    }
    
    // Submit the form
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Leave application submitted successfully");
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
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
          <h1 className="text-2xl font-bold tracking-tight">Apply for Leave</h1>
          <p className="text-muted-foreground">
            Fill out the form below to submit a new leave request
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Leave Type Selection */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Leave Type</CardTitle>
                <CardDescription>
                  Select the type of leave you are requesting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaveTypeSelector
                  selectedType={selectedLeaveType}
                  onSelectType={setSelectedLeaveType}
                />
              </CardContent>
            </Card>
          </div>

          {/* Date Range Selection */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Date Range</CardTitle>
                <CardDescription>
                  Select the start and end dates for your leave
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DateRangePicker
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>
                Where will you be during your leave?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Enter city or address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Emergency Option */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Leave</CardTitle>
              <CardDescription>
                Activate only for urgent situations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={cn(
                  "cursor-pointer rounded-lg border p-4 transition-all",
                  isEmergency 
                    ? "border-red-300 bg-red-50 text-red-900" 
                    : "border-muted hover:border-muted-foreground/25"
                )}
                onClick={() => setIsEmergency(!isEmergency)}
              >
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={cn(
                    "h-5 w-5",
                    isEmergency ? "text-red-600" : "text-muted-foreground"
                  )} />
                  <div className="font-medium">
                    {isEmergency ? "Emergency Leave Activated" : "Regular Leave"}
                  </div>
                </div>
                <p className="mt-1 text-sm">
                  {isEmergency
                    ? "All authorities will be notified immediately for faster approval"
                    : "Switch to emergency only for urgent situations requiring immediate attention"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reason / Purpose */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Reason for Leave</CardTitle>
                <CardDescription>
                  Please provide details about the purpose of your leave
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter the reason for your leave request..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Form Submission */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
                <CardDescription>
                  Double-check your information before submitting
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4 rounded-lg bg-muted/50 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Leave Type</p>
                      <p>{selectedLeaveType || "Not selected"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date Range</p>
                      <p>
                        {dateRange.from && dateRange.to
                          ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                          : "Not selected"}
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <p>{location || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Priority</p>
                      <p>{isEmergency ? "Emergency" : "Regular"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <SendHorizonal className="mr-2 h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};
