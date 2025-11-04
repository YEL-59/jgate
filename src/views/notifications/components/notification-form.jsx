"use client";

import { useState } from "react";
import { Mail, MessageSquare, Bell, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function NotificationForm({ recipientGroups, onSend, defaultType = 'email' }) {
  const [activeTab, setActiveTab] = useState(defaultType);
  const [recipients, setRecipients] = useState('all_users');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  const [pushTitle, setPushTitle] = useState('');
  const [pushBody, setPushBody] = useState('');

  const selectedRecipientGroup = recipientGroups.find(g => g.id === recipients);
  const estimatedReach = selectedRecipientGroup?.count || 0;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail size={16} />;
      case 'sms':
        return <MessageSquare size={16} />;
      case 'push':
        return <Bell size={16} />;
      default:
        return <Mail size={16} />;
    }
  };

  const handleSend = () => {
    let notificationData = {
      type: activeTab,
      recipients,
      estimatedReach,
    };

    if (activeTab === 'email') {
      if (!emailSubject || !emailBody) {
        alert('Please fill in subject and email body');
        return;
      }
      notificationData = { ...notificationData, subject: emailSubject, body: emailBody };
    } else if (activeTab === 'sms') {
      if (!smsMessage) {
        alert('Please enter SMS message');
        return;
      }
      if (smsMessage.length > 160) {
        alert('SMS message cannot exceed 160 characters');
        return;
      }
      notificationData = { ...notificationData, message: smsMessage };
    } else if (activeTab === 'push') {
      if (!pushTitle || !pushBody) {
        alert('Please fill in notification title and body');
        return;
      }
      notificationData = { ...notificationData, title: pushTitle, body: pushBody };
    }

    onSend(notificationData);
    
    // Reset form
    setEmailSubject('');
    setEmailBody('');
    setSmsMessage('');
    setPushTitle('');
    setPushBody('');
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList style={{ 
          display: 'flex', 
          gap: '8px', 
          backgroundColor: '#F3F4F6', 
          padding: '4px',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <TabsTrigger value="email" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: activeTab === 'email' ? '#301960' : 'transparent',
            color: activeTab === 'email' ? 'white' : '#666666',
            fontSize: '14px',
            fontWeight: activeTab === 'email' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
            <Mail size={16} />
            Email
          </TabsTrigger>
          <TabsTrigger value="sms" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: activeTab === 'sms' ? '#301960' : 'transparent',
            color: activeTab === 'sms' ? 'white' : '#666666',
            fontSize: '14px',
            fontWeight: activeTab === 'sms' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
            <MessageSquare size={16} />
            SMS
          </TabsTrigger>
          <TabsTrigger value="push" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: activeTab === 'push' ? '#301960' : 'transparent',
            color: activeTab === 'push' ? 'white' : '#666666',
            fontSize: '14px',
            fontWeight: activeTab === 'push' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
            <Bell size={16} />
            Push
          </TabsTrigger>
        </TabsList>

        {/* Email Tab */}
        <TabsContent value="email" style={{ margin: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Recipients */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a',
                marginBottom: '8px',
                display: 'block'
              }}>
                Recipients
              </label>
              <select
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                {recipientGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.label} ({group.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Line */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a',
                marginBottom: '8px',
                display: 'block'
              }}>
                Subject Line
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter email subject"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#301960';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              />
            </div>

            {/* Email Body */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a',
                marginBottom: '8px',
                display: 'block'
              }}>
                Email Body
              </label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Enter email content"
                rows={6}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#301960';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              />
            </div>
          </div>
        </TabsContent>

        {/* SMS Tab */}
        <TabsContent value="sms" style={{ margin: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Recipients */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a',
                marginBottom: '8px',
                display: 'block'
              }}>
                Recipients
              </label>
              <select
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                {recipientGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.label} ({group.count})
                  </option>
                ))}
              </select>
            </div>

            {/* SMS Message */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a',
                marginBottom: '8px',
                display: 'block'
              }}>
                SMS Message
              </label>
              <textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                placeholder="Enter SMS content (160 characters max)"
                rows={4}
                maxLength={160}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#301960';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              />
              <div style={{ 
                fontSize: '12px', 
                color: '#666666', 
                marginTop: '6px',
                textAlign: 'right'
              }}>
                {smsMessage.length}/160 characters
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Push Tab */}
        <TabsContent value="push" style={{ margin: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Recipients */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a',
                marginBottom: '8px',
                display: 'block'
              }}>
                Recipients
              </label>
              <select
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                {recipientGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.label} ({group.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Notification Title */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a',
                marginBottom: '8px',
                display: 'block'
              }}>
                Notification Title
              </label>
              <input
                type="text"
                value={pushTitle}
                onChange={(e) => setPushTitle(e.target.value)}
                placeholder="Enter notification title"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#301960';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              />
            </div>

            {/* Notification Body */}
            <div>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#1a1a1a',
                marginBottom: '8px',
                display: 'block'
              }}>
                Notification Body
              </label>
              <textarea
                value={pushBody}
                onChange={(e) => setPushBody(e.target.value)}
                placeholder="Enter notification content"
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#301960';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Estimated Reach */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#FFC107',
        borderRadius: '8px',
        marginTop: '20px',
        marginBottom: '20px',
      }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
          Estimated reach: {estimatedReach} users
        </div>
      </div>

      {/* Send Button */}
      <Button
        onClick={handleSend}
        style={{
          width: '100%',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#301960',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1a1140';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#301960';
        }}
      >
        <Send size={16} />
        Send Notification
      </Button>
    </div>
  );
}

