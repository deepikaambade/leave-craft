
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, PenLine, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { DraftItem } from "./DraftItem";

export const DraftsList: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for drafts
  const [drafts, setDrafts] = useState([
    {
      id: "D1001",
      type: "Medical",
      startDate: "2023-09-10",
      endDate: "2023-09-15",
      reason: "Doctor appointment and follow-up",
      location: "City Hospital",
      createdAt: "2023-08-28T10:00:00",
      isPrebooked: false,
    },
    {
      id: "D1002",
      type: "Vacation",
      startDate: "2023-12-20",
      endDate: "2023-12-31",
      reason: "Winter break family vacation",
      location: "Home",
      createdAt: "2023-07-15T14:30:00",
      isPrebooked: true,
    },
    {
      id: "D1003",
      type: "Day Leave",
      startDate: "2023-11-05",
      endDate: "2023-11-05",
      reason: "Family function",
      location: "Relative's House",
      createdAt: "2023-10-25T09:15:00",
      isPrebooked: true,
    }
  ]);

  const handleDeleteDraft = (draftId: string) => {
    setDrafts(drafts.filter(draft => draft.id !== draftId));
    toast.success("Draft deleted successfully");
  };

  const handleSubmitDraft = (draftId: string) => {
    // In a real application, we would submit the draft here
    toast.success("Draft submitted for approval");
    setDrafts(drafts.filter(draft => draft.id !== draftId));
    // Navigate to history or confirmation page
    setTimeout(() => navigate("/history"), 1000);
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
          <h1 className="text-2xl font-bold tracking-tight">Leave Drafts</h1>
          <p className="text-muted-foreground">
            Manage and prebook your leave requests
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Draft Requests</CardTitle>
            <Button size="sm" onClick={() => navigate("/apply")}>
              <Plus className="mr-2 h-4 w-4" />
              New Draft
            </Button>
          </div>
          <CardDescription>
            Continue editing your drafts or prebook leave for future dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {drafts.length > 0 ? (
              drafts.map((draft, index) => (
                <React.Fragment key={draft.id}>
                  <DraftItem 
                    draft={draft} 
                    onDelete={() => handleDeleteDraft(draft.id)} 
                    onSubmit={() => handleSubmitDraft(draft.id)}
                    onEdit={() => navigate(`/apply?draft=${draft.id}`)}
                  />
                  {index < drafts.length - 1 && <Separator className="my-2" />}
                </React.Fragment>
              ))
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8">
                <p className="mb-2 text-center text-muted-foreground">
                  No draft requests found
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
