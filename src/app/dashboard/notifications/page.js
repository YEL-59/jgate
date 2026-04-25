"use client";

import { useState } from "react";
import { NotificationForm } from "@/views/notifications/components/notification-form";
import { notificationService } from "@/services/notification.service";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [loading, setLoading] = useState(false);

  const handleSendNotification = async (notificationData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await notificationService.sendNotification(notificationData, token);
      
      if (result.success) {
        toast.success(result.message || 'Successfully sent notifications');
      } else {
        toast.error('Failed to send notification: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to send notification:', error);
      toast.error('Failed to send notification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px', margin: 0 }}>
          Notification Manager
        </h1>
        <p style={{ fontSize: '16px', color: '#666666', margin: 0 }}>
          Send targeted communications to user segments
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 600px), 1fr))',
        gap: '24px',
        alignItems: 'flex-start',
      }}>
        {/* Create Notification Form */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px', margin: 0 }}>
            Create Notification
          </h2>
          <div style={{ position: 'relative' }}>
            {loading && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255,255,255,0.7)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px'
              }}>
                <span style={{ fontWeight: 'bold', color: '#301960' }}>Sending...</span>
              </div>
            )}
            <NotificationForm onSend={handleSendNotification} />
          </div>
        </div>
      </div>
    </div>
  );
}

