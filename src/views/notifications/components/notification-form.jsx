"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NotificationForm({ onSend }) {
  const [type, setType] = useState('all');
  const [channels, setChannels] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const channelOptions = [
    { id: 'fcm', label: 'FCM (Push)' },
    { id: 'mail', label: 'Email' },
    { id: 'sms', label: 'SMS' },
    { id: 'database', label: 'Database' },
  ];

  const handleChannelToggle = (channelId) => {
    setChannels((prev) => {
      if (prev.includes(channelId)) {
        // If already selected, uncheck it
        return [];
      } else {
        // Only allow one main channel to be selected at a time
        // If FCM is selected, automatically include 'database' behind the scenes
        if (channelId === 'fcm') {
          return ['fcm', 'database'];
        }
        return [channelId];
      }
    });
  };

  const handleSend = () => {
    if (!title || !body) {
      toast.error('Please fill in both title and body');
      return;
    }

    if (channels.length === 0) {
      toast.error('Please select at least one channel');
      return;
    }

    const notificationData = {
      type,
      channels,
      title,
      body,
    };

    onSend(notificationData);
    
    // Reset form
    setTitle('');
    setBody('');
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Recipient Type */}
        <div>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#1a1a1a',
            marginBottom: '8px',
            display: 'block'
          }}>
            Recipient Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
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
            <option value="all">All</option>
            <option value="actor">Actor</option>
            <option value="director">Director</option>
          </select>
        </div>

        {/* Channels */}
        <div>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#1a1a1a',
            marginBottom: '8px',
            display: 'block'
          }}>
            Channels
          </label>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {channelOptions
              .filter(option => option.id !== 'database')
              .map((option) => (
              <label key={option.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={channels.includes(option.id)}
                  onChange={() => handleChannelToggle(option.id)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', color: '#1a1a1a' }}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Title */}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

        {/* Body */}
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
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter notification content"
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
          marginTop: '24px'
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

