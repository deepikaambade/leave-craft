
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, User, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Contact {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string;
}

export const ContactsSettings: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for contacts
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "c1",
      type: "Parent",
      name: "David Doe",
      phone: "+91 98765 43210",
      email: "david.doe@example.com",
    },
    {
      id: "c2",
      type: "Dean",
      name: "Dr. Smith Johnson",
      phone: "+91 87654 32109",
      email: "smith.johnson@example.com",
    },
    {
      id: "c3",
      type: "Warden",
      name: "Prof. Robert Brown",
      phone: "+91 76543 21098",
      email: "robert.brown@example.com",
    },
    {
      id: "c4",
      type: "Emergency",
      name: "Jane Doe",
      phone: "+91 65432 10987",
      email: "jane.doe@example.com",
    },
  ]);

  const [editedContacts, setEditedContacts] = useState<Contact[]>(contacts);

  const handleContactChange = (id: string, field: keyof Contact, value: string) => {
    setEditedContacts(editedContacts.map(contact => 
      contact.id === id ? {...contact, [field]: value} : contact
    ));
  };

  const handleSave = () => {
    setContacts(editedContacts);
    toast.success("Contacts updated successfully");
  };

  const handleCancel = () => {
    setEditedContacts(contacts);
    navigate(-1);
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
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your contacts and application settings
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>
            Update your emergency contacts information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {editedContacts.map((contact, index) => (
              <React.Fragment key={contact.id}>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">{contact.type}</h3>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${contact.id}`}>Name</Label>
                      <Input
                        id={`name-${contact.id}`}
                        value={contact.name}
                        onChange={(e) => handleContactChange(contact.id, 'name', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`phone-${contact.id}`}>Phone</Label>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`phone-${contact.id}`}
                          value={contact.phone}
                          onChange={(e) => handleContactChange(contact.id, 'phone', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor={`email-${contact.id}`}>Email</Label>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`email-${contact.id}`}
                          type="email"
                          value={contact.email}
                          onChange={(e) => handleContactChange(contact.id, 'email', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {index < editedContacts.length - 1 && <Separator className="my-6" />}
              </React.Fragment>
            ))}
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
