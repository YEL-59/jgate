import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Check, Trash2, Settings } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: "New Order Received", message: "Order #ORD-001 has been placed", time: "5 minutes ago", read: false, type: "order" },
    { id: 2, title: "System Update", message: "Your system has been updated to version 2.0", time: "1 hour ago", read: false, type: "system" },
    { id: 3, title: "New User Registered", message: "John Doe has created an account", time: "3 hours ago", read: true, type: "user" },
    { id: 4, title: "Payment Received", message: "Payment of $299.99 has been processed", time: "1 day ago", read: true, type: "payment" },
    { id: 5, title: "Low Stock Alert", message: "Product A is running low on stock", time: "2 days ago", read: true, type: "alert" },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case "order":
        return "default";
      case "system":
        return "secondary";
      case "user":
        return "outline";
      case "payment":
        return "default";
      case "alert":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Manage your notifications and alerts.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline">
            <Check className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            All Notifications
          </CardTitle>
          <CardDescription>
            {notifications.filter(n => !n.read).length} unread notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  !notification.read ? "bg-accent/50" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <Badge variant={getTypeColor(notification.type)} className="text-xs">
                      {notification.type}
                    </Badge>
                    {!notification.read && (
                      <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <Button variant="ghost" size="sm">
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



