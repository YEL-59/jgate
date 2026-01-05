"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContentEditor({ page, onSave, saving }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (page) {
      setTitle(page.title || '');
      setContent(page.content || '');
      setHasUnsavedChanges(false);
    }
  }, [page]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    if (!page) return;
    
    if (onSave) {
      onSave(page.id, title, content);
      setHasUnsavedChanges(false);
    }
  };

  if (!page) {
    return (
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        padding: '40px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        color: '#666666'
      }}>
        Select a page to edit
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px', margin: 0 }}>
        Edit Content
      </h2>

      {/* Page Title */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#1a1a1a',
          marginBottom: '8px',
          display: 'block'
        }}>
          Page Title
        </label>
        <input
          type="text"
          value={title}
          readOnly
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            fontSize: '14px',
            outline: 'none',
            backgroundColor: '#F9FAFB',
            color: '#666666',
            cursor: 'not-allowed',
          }}
        />
      </div>

      {/* Content Editor */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#1a1a1a',
          marginBottom: '8px',
          display: 'block'
        }}>
          Content
        </label>
        
        <textarea
          value={content}
          onChange={handleContentChange}
          style={{
            width: '100%',
            minHeight: '350px',
            padding: '12px',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.6',
            outline: 'none',
            backgroundColor: 'white',
            resize: 'vertical',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#301960';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#e5e5e5';
          }}
        />

        <p style={{ 
          fontSize: '12px', 
          color: '#666666', 
          marginTop: '8px',
          margin: '8px 0 0 0'
        }}>
          Enter the content for this page. Changes are saved when you click &apos;Save Content & Publish&apos;.
        </p>
      </div>

      {/* Unsaved Changes Notice */}
      {hasUnsavedChanges && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#FFFBEB',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #FEF3C7',
        }}>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#92400E' }}>
            You have unsaved changes
          </div>
        </div>
      )}

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={saving}
        style={{
          width: '100%',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: saving ? '#9CA3AF' : '#301960',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          cursor: saving ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s',
        }}
      >
        <Save size={16} />
        {saving ? 'Saving...' : 'Save Content & Publish'}
      </Button>
    </div>
  );
}

