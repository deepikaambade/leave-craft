
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, PenLine, Trash2, Send, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Draft {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  location: string;
  createdAt: string;
  isPrebooked: boolean;
}

interface DraftItemProps {
  draft: Draft;
  onDelete: () => void;
  onSubmit: () => void;
  onEdit: () => void;
}

export const DraftItem: React.FC<DraftItemProps> = ({ draft, onDelete, onSubmit, onEdit }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const timeAgo = formatDistanceToNow(new Date(draft.createdAt), { addSuffix: true });

  return (
    <div className="rounded-lg hover:bg-muted/30 p-3">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Draft Information */}
        <div className="space-y-3 md:w-7/12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{draft.type} Leave</span>
              {draft.isPrebooked && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Prebooked
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">Created {timeAgo}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">
                  {formatDate(draft.startDate)} - {formatDate(draft.endDate)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(draft.startDate) > new Date() ? "Upcoming" : "Past dates"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{draft.location}</div>
                <p className="text-xs text-muted-foreground">Location</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm line-clamp-2">{draft.reason}</div>
              <p className="text-xs text-muted-foreground">Reason</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <Button variant="outline" size="sm" className="w-full" onClick={onEdit}>
            <PenLine className="mr-1 h-3 w-3" />
            Edit
          </Button>
          <Button variant="default" size="sm" className="w-full" onClick={onSubmit}>
            <Send className="mr-1 h-3 w-3" />
            Submit
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-destructive hover:bg-destructive/10" onClick={onDelete}>
            <Trash2 className="mr-1 h-3 w-3" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
