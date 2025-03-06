
import React from "react";
import { X, Phone, Mail, MapPin, QrCode } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProfileSidebarProps {
  onClose: () => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ onClose }) => {
  // Mock student data
  const student = {
    name: "John Doe",
    id: "CS2022456",
    hostel: "H6-302",
    program: "B.Tech Computer Science",
    year: "2nd Year",
    profileImage: "/placeholder.svg",
    contacts: [
      { type: "Dean", name: "Dr. Smith Johnson", phone: "+91 98765 43210" },
      { type: "Warden", name: "Prof. Robert Brown", phone: "+91 87654 32109" },
      { type: "Parent", name: "Mr. David Doe", phone: "+91 76543 21098" },
      { type: "Security", name: "Campus Security", phone: "+91 65432 10987" },
    ],
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={student.profileImage} alt={student.name} />
            <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-xl font-semibold">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.id}</p>
          </div>
        </div>

        {/* Student Details */}
        <div className="mt-8 space-y-4 rounded-lg border bg-card/50 p-4 backdrop-blur-xs">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-muted-foreground">Hostel Room</span>
            <span className="text-sm">{student.hostel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-muted-foreground">Program</span>
            <span className="text-sm">{student.program}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-muted-foreground">Year</span>
            <span className="text-sm">{student.year}</span>
          </div>
        </div>

        {/* QR Code */}
        <div className="mt-8 flex flex-col items-center space-y-3">
          <div className="flex-center h-40 w-40 rounded-lg border-2 border-dashed border-muted p-2">
            <QrCode className="h-32 w-32 text-muted" />
          </div>
          <p className="text-sm text-muted-foreground">Profile QR Code for gate scanning</p>
        </div>

        <Separator className="my-6" />

        {/* Contacts */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Important Contacts
          </h4>
          <div className="space-y-4">
            {student.contacts.map((contact, index) => (
              <div key={index} className="flex items-start justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.type}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Phone size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
