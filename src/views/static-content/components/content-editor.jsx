"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import UnderlineExtension from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const buttons = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: 'bold', title: 'Bold' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: 'italic', title: 'Italic' },
    { icon: Underline, action: () => editor.chain().focus().toggleUnderline().run(), active: 'underline', title: 'Underline' },
    { type: 'divider' },
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: { heading: { level: 1 } }, title: 'H1' },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: { heading: { level: 2 } }, title: 'H2' },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: { heading: { level: 3 } }, title: 'H3' },
    { type: 'divider' },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: 'bulletList', title: 'Bullet List' },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: 'orderedList', title: 'Ordered List' },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: 'blockquote', title: 'Quote' },
    { type: 'divider' },
    { icon: AlignLeft, action: () => editor.chain().focus().setTextAlign('left').run(), active: { textAlign: 'left' }, title: 'Align Left' },
    { icon: AlignCenter, action: () => editor.chain().focus().setTextAlign('center').run(), active: { textAlign: 'center' }, title: 'Align Center' },
    { icon: AlignRight, action: () => editor.chain().focus().setTextAlign('right').run(), active: { textAlign: 'right' }, title: 'Align Right' },
    { type: 'divider' },
    { icon: LinkIcon, action: toggleLink, active: 'link', title: 'Link' },
    { type: 'divider' },
    { icon: Undo, action: () => editor.chain().focus().undo().run(), disabled: !editor.can().undo(), title: 'Undo' },
    { icon: Redo, action: () => editor.chain().focus().redo().run(), disabled: !editor.can().redo(), title: 'Redo' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      padding: '8px',
      border: '1px solid #e5e5e5',
      borderBottom: 'none',
      borderRadius: '8px 8px 0 0',
      backgroundColor: '#F9FAFB',
    }}>
      {buttons.map((btn, i) => {
        if (btn.type === 'divider') {
          return <div key={i} style={{ width: '1px', backgroundColor: '#e5e5e5', margin: '4px 4px' }} />;
        }
        const Icon = btn.icon;
        const isActive = btn.active ? (typeof btn.active === 'string' ? editor.isActive(btn.active) : editor.isActive(btn.active)) : false;
        
        return (
          <button
            key={i}
            onClick={btn.action}
            disabled={btn.disabled}
            title={btn.title}
            type="button"
            style={{
              padding: '6px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: isActive ? '#f3f4f6' : 'transparent',
              color: isActive ? '#301960' : '#4b5563',
              cursor: btn.disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              opacity: btn.disabled ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isActive && !btn.disabled) {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive && !btn.disabled) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
};

export function ContentEditor({ page, onSave, saving }) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Write something amazing...',
      }),
    ],
    immediatelyRender: false,
    content: '',
    onUpdate: ({ editor }) => {
      setHasUnsavedChanges(true);
    },
    editorProps: {
      attributes: {
        style: 'min-height: 400px; max-height: 500px; overflow-y: auto; padding: 16px; outline: none; font-size: 15px; line-height: 1.6; color: #1a1a1a;',
        class: 'custom-scrollbar',
      },
    },
  });

  useEffect(() => {
    if (page && editor) {
      // Avoid firing onUpdate when we programmatically set content
      editor.commands.setContent(page.content || '');
      // Use setTimeout to avoid synchronous setState warning during render cycle evaluation
      setTimeout(() => setHasUnsavedChanges(false), 0);
    }
  }, [page, editor]);

  const handleSave = () => {
    if (!page || !editor) return;
    
    if (onSave) {
      onSave(page.id, page.title || '', editor.getHTML());
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
          value={page.title || ''}
          readOnly
          style={{
            width: '100%',
            padding: '12px',
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
        
        <div style={{
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <MenuBar editor={editor} />
          <style>{`
            .ProseMirror p.is-editor-empty:first-child::before {
              content: attr(data-placeholder);
              float: left;
              color: #adb5bd;
              pointer-events: none;
              height: 0;
            }
            .ProseMirror ul { padding-left: 20px; list-style-type: disc; }
            .ProseMirror ol { padding-left: 20px; list-style-type: decimal; }
            .ProseMirror h1 { font-size: 2em; font-weight: bold; margin-bottom: 0.5em; }
            .ProseMirror h2 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; }
            .ProseMirror h3 { font-size: 1.17em; font-weight: bold; margin-bottom: 0.5em; }
            .ProseMirror blockquote { border-left: 3px solid #e5e5e5; padding-left: 1rem; color: #666; font-style: italic; }
            .ProseMirror a { color: #301960; text-decoration: underline; cursor: pointer; }

            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #F9FAFB;
              border-left: 1px solid #e5e5e5;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #d1d5db;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #9ca3af;
            }
          `}</style>
          <EditorContent editor={editor} />
        </div>

        <p style={{ 
          fontSize: '12px', 
          color: '#666666', 
          marginTop: '8px',
          margin: '8px 0 0 0'
        }}>
          Use the toolbar to format your content. Changes are saved when you click &apos;Save Content & Publish&apos;.
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
        disabled={saving || !hasUnsavedChanges}
        style={{
          width: '100%',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: saving ? '#9CA3AF' : (hasUnsavedChanges ? '#301960' : '#E5E7EB'),
          color: (saving || !hasUnsavedChanges) ? '#4B5563' : 'white',
          fontSize: '14px',
          fontWeight: '600',
          cursor: (saving || !hasUnsavedChanges) ? 'not-allowed' : 'pointer',
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

