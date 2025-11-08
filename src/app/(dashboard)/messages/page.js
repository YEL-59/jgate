import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Inbox, Archive } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MessagesPage() {
  const messages = [
    { id: 1, sender: "John Doe", subject: "Product Inquiry", message: "I'm interested in your products...", time: "2 hours ago", unread: true },
    { id: 2, sender: "Jane Smith", subject: "Support Request", message: "Need help with my account...", time: "5 hours ago", unread: true },
    { id: 3, sender: "Bob Johnson", subject: "Feedback", message: "Great service, thank you!", time: "1 day ago", unread: false },
    { id: 4, sender: "Alice Williams", subject: "Partnership Inquiry", message: "Would like to discuss partnership...", time: "2 days ago", unread: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">
            Manage your messages and communications.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Inbox className="h-5 w-5" />
              Inbox
            </CardTitle>
            <CardDescription>
              {messages.filter(m => m.unread).length} unread messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg border cursor-pointer hover:bg-accent ${msg.unread ? "bg-accent/50" : ""}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-sm">{msg.sender}</p>
                  {msg.unread && <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />}
                </div>
                <p className="text-sm font-medium mb-1">{msg.subject}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message View
            </CardTitle>
            <CardDescription>
              Select a message to view details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center py-12">
                Select a message from the inbox to view its contents
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



