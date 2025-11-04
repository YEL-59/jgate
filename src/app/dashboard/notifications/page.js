"use client";

import { useState, useEffect } from "react";
import { NotificationForm } from "@/views/notifications/components/notification-form";
import { TemplatesList } from "@/views/notifications/components/templates-list";
import { notificationController } from "@/controllers/notification.controller";

export default function NotificationsPage() {
  const [recipientGroups, setRecipientGroups] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchData() {
      try {
        const groups = notificationController.getRecipientGroups();
        const templateList = notificationController.getTemplates();
        setRecipientGroups(groups);
        setTemplates(templateList);
      } catch (error) {
        console.error('Failed to fetch notification data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSendNotification = async (notificationData) => {
    try {
      await notificationController.sendNotification(notificationData);
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Failed to send notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{ color: '#666666' }}>Loading...</div>
      </div>
    );
  }

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

      {/* Main Content - Two Column Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
        gap: '24px',
        alignItems: 'flex-start',
      }}>
        {/* Create Notification Form */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px', margin: 0 }}>
            Create Notification
          </h2>
          <NotificationForm
            recipientGroups={recipientGroups}
            onSend={handleSendNotification}
            defaultType="email"
          />
        </div>

        {/* Templates List */}
        <div>
          <TemplatesList templates={templates} />
        </div>
      </div>
    </div>
  );
}

