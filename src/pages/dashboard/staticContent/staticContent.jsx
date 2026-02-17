"use client";

import { useState, useEffect } from "react";
import { PagesList } from "@/views/static-content/components/pages-list";
import { ContentEditor } from "@/views/static-content/components/content-editor";
import { updateStaticContent, useStaticContent } from "@/services/dashboard/staticcontent";
import { toast } from "sonner";
import { PageLoader } from "@/components/ui/loading-spinner";

// Define the available page types as constant menu items
const PAGE_TYPES = [
    { id: 'about_us', title: 'About Us' },
    { id: 'terms_of_service', title: 'Terms of Service' },
    { id: 'privacy_policy', title: 'Privacy Policy' },
    { id: 'faq', title: 'Frequently Asked Questions' },
    { id: 'help_center', title: 'Help Center' },
    { id: 'contact_us', title: 'Contact Us' }
];

export default function StaticContent({ staticContent: initialStaticContent, loading: initialLoading }) {
  const [selectedPageId, setSelectedPageId] = useState(PAGE_TYPES[0].id);
  const [pageContent, setPageContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [staticContent, setStaticContent] = useState(initialStaticContent || []);
  const [loading, setLoading] = useState(initialLoading || false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await useStaticContent(token);
      if (res?.success) {
        setStaticContent(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch static content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialStaticContent) {
      fetchData();
    }
  }, []);

  // When selectedPageId changes, find the existing content for that type from the API props
  // or default to empty if not found.
  useEffect(() => {
    // staticContent is an array of page objects from API
    // We look for one that matches the current selectedPageId (which is the 'type' in DB usually, or mapped)
    // The user says response has 'type': 'privacy_policy'.
    // So we filter `staticContent` by `type`.
    
    // Default structure for editor
    let currentData = {
        id: selectedPageId, // used for key/tracking
        type: selectedPageId,
        title: PAGE_TYPES.find(p => p.id === selectedPageId)?.title || '',
        content: ''
    };

    if (staticContent && Array.isArray(staticContent)) {
        const found = staticContent.find(item => item.type === selectedPageId);
        if (found) {
            currentData = {
                ...currentData,
                title: found.title || currentData.title,
                content: found.content || ''
            };
        }
    }
    setPageContent(currentData);
  }, [selectedPageId, staticContent]);



  const handlePageSelect = (pageId) => {
    setSelectedPageId(pageId);
  };

  const handleSave = async (pageId, title, content) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      // Find the fixed title for this page type
      const fixedTitle = PAGE_TYPES.find(p => p.id === selectedPageId)?.title || title;
      
      const res = await updateStaticContent(token, selectedPageId, { title: fixedTitle, content });
      
      if (res?.success) {
          toast.success("Content saved successfully!");
          // Update local state with the new data
          setStaticContent(prev => {
              const index = prev.findIndex(item => item.type === selectedPageId);
              if (index !== -1) {
                  const updated = [...prev];
                  updated[index] = res.data;
                  return updated;
              }
              return [...prev, res.data];
          });
      } else {
          toast.error(res?.message || "Failed to save content.");
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      toast.error('Failed to save content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading && !pageContent) {
    return <PageLoader message="Fetching static content..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px', margin: 0 }}>
          Static Content Management
        </h1>
        <p style={{ fontSize: '16px', color: '#666666', margin: 0 }}>
          Update legal and informational pages
        </p>
      </div>

      {/* Main Content - Two Column Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: '24px',
        alignItems: 'flex-start',
      }}>
        {/* Pages List */}
        <PagesList
          pages={PAGE_TYPES}
          selectedPageId={selectedPageId}
          onPageSelect={handlePageSelect}
        />

        {/* Content Editor */}
        <ContentEditor
          page={pageContent}
          onSave={handleSave}
          saving={saving}
        />
      </div>
    </div>
  );
}
