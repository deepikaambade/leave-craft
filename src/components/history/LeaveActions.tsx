
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, PenLine, Clock, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface LeaveActionsProps {
  id: string;
  status: "approved" | "rejected" | "pending" | "draft";
}

export const LeaveActions: React.FC<LeaveActionsProps> = ({ id, status }) => {
  const handleCopyId = () => {
    navigator.clipboard.writeText(id);
    toast.success("Leave ID copied to clipboard");
  };

  const handleDelete = () => {
    // Would handle actual deletion in a real app
    toast.success(`Leave request ${id} deleted`);
  };

  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" size="sm" className={cn(
        "text-xs",
        status === "approved" && "bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800",
        status === "rejected" && "bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
      )}>
        <ExternalLink className="mr-1 h-3 w-3" />
        View Details
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <span className="sr-only">Open menu</span>
            <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 1.5C1.5 1.89782 1.65804 2.27936 1.93934 2.56066C2.22064 2.84196 2.60218 3 3 3C3.39782 3 3.77936 2.84196 4.06066 2.56066C4.34196 2.27936 4.5 1.89782 4.5 1.5C4.5 1.10218 4.34196 0.720644 4.06066 0.43934C3.77936 0.158035 3.39782 0 3 0C2.60218 0 2.22064 0.158035 1.93934 0.43934C1.65804 0.720644 1.5 1.10218 1.5 1.5ZM6 1.5C6 1.89782 6.15804 2.27936 6.43934 2.56066C6.72064 2.84196 7.10218 3 7.5 3C7.89782 3 8.27936 2.84196 8.56066 2.56066C8.84196 2.27936 9 1.89782 9 1.5C9 1.10218 8.84196 0.720644 8.56066 0.43934C8.27936 0.158035 7.89782 0 7.5 0C7.10218 0 6.72064 0.158035 6.43934 0.43934C6.15804 0.720644 6 1.10218 6 1.5ZM10.5 1.5C10.5 1.89782 10.658 2.27936 10.9393 2.56066C11.2206 2.84196 11.6022 3 12 3C12.3978 3 12.7794 2.84196 13.0607 2.56066C13.342 2.27936 13.5 1.89782 13.5 1.5C13.5 1.10218 13.342 0.720644 13.0607 0.43934C12.7794 0.158035 12.3978 0 12 0C11.6022 0 11.2206 0.158035 10.9393 0.43934C10.658 0.720644 10.5 1.10218 10.5 1.5Z" fill="currentColor" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleCopyId} className="flex items-center">
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy Leave ID</span>
          </DropdownMenuItem>
          
          {status === "draft" && (
            <DropdownMenuItem className="flex items-center">
              <PenLine className="mr-2 h-4 w-4" />
              <span>Continue Editing</span>
            </DropdownMenuItem>
          )}
          
          {status === "pending" && (
            <DropdownMenuItem className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>Send Reminder</span>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem onClick={handleDelete} className="flex items-center text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
