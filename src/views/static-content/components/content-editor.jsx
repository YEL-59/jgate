"use client";

import { useState, useEffect, useRef } from "react";
import { Save, Bold, Italic, Underline, List, ListOrdered, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContentEditor({ page, onSave, saving }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (page) {
      setTitle(page.title || '');
      setContent(page.content || '');
      setHasUnsavedChanges(false);
      if (editorRef.current) {
        editorRef.current.innerHTML = page.content || '';
      }
    }
  }, [page]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      setHasUnsavedChanges(true);
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleContentChange();
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
          onChange={handleTitleChange}
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
        
        {/* Toolbar */}
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '8px',
          border: '1px solid #e5e5e5',
          borderBottom: 'none',
          borderRadius: '8px 8px 0 0',
          backgroundColor: '#F9FAFB',
          flexWrap: 'wrap',
        }}>
          <button
            type="button"
            onClick={() => execCommand('bold')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand('underline')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            title="Underline"
          >
            <Underline size={16} />
          </button>
          <div style={{ width: '1px', backgroundColor: '#e5e5e5', margin: '4px 0' }} />
          <button
            type="button"
            onClick={() => execCommand('formatBlock', '<h1>')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', '<h2>')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', '<h3>')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            title="Heading 3"
          >
            H3
          </button>
          <div style={{ width: '1px', backgroundColor: '#e5e5e5', margin: '4px 0' }} />
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = prompt('Enter URL:');
              if (url) execCommand('createLink', url);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            title="Insert Link"
          >
            <Link2 size={16} />
          </button>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            minHeight: '300px',
            padding: '12px',
            border: '1px solid #e5e5e5',
            borderRadius: '0 0 8px 8px',
            fontSize: '14px',
            lineHeight: '1.6',
            outline: 'none',
            backgroundColor: 'white',
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
          Use the toolbar above to format your content. Changes are saved when you click &apos;Save Content & Publish&apos;.
        </p>
      </div>

      {/* Unsaved Changes Notice */}
      {hasUnsavedChanges && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#FFC107',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>
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
          backgroundColor: saving ? '#9CA3AF' : '#FFC107',
          color: '#1a1a1a',
          fontSize: '14px',
          fontWeight: '600',
          cursor: saving ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!saving) {
            e.currentTarget.style.backgroundColor = '#FBBF24';
          }
        }}
        onMouseLeave={(e) => {
          if (!saving) {
            e.currentTarget.style.backgroundColor = '#FFC107';
          }
        }}
      >
        <Save size={16} />
        {saving ? 'Saving...' : 'Save Content & Publish'}
      </Button>
    </div>
  );
}

