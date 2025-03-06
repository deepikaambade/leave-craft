
import React from "react";
import { cn } from "@/lib/utils";
import { Stethoscope, Plane, CalendarClock, Siren, Activity } from "lucide-react";

interface LeaveTypeSelectorProps {
  selectedType: string | null;
  onSelectType: (type: string) => void;
}

const leaveTypes = [
  {
    id: "medical",
    name: "Medical Leave",
    description: "For health-related issues requiring medical attention",
    icon: Stethoscope,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "vacation",
    name: "Vacation",
    description: "For planned holidays or personal time off",
    icon: Plane,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "day",
    name: "Day Leave",
    description: "For short absences of one day or less",
    icon: CalendarClock,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: "emergency",
    name: "Emergency",
    description: "For urgent situations requiring immediate leave",
    icon: Siren,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: "other",
    name: "Other",
    description: "For leaves that don't fit other categories",
    icon: Activity,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

export const LeaveTypeSelector: React.FC<LeaveTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {leaveTypes.map((type) => (
        <div
          key={type.id}
          className={cn(
            "leave-type-card",
            selectedType === type.id && "selected",
            selectedType === type.id
              ? `${type.borderColor} ${type.bgColor}`
              : "border-border hover:border-primary/25 hover:bg-accent/50"
          )}
          onClick={() => onSelectType(type.id)}
        >
          <div className="flex flex-col items-center text-center">
            <div
              className={cn(
                "mb-3 flex h-10 w-10 items-center justify-center rounded-full",
                type.bgColor,
                type.color
              )}
            >
              <type.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-1 font-medium">{type.name}</h3>
            <p className="text-xs text-muted-foreground">{type.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
