"use client";

import { useState, useEffect } from "react";
import { PagesList } from "@/views/static-content/components/pages-list";
import { ContentEditor } from "@/views/static-content/components/content-editor";
import { FaqHelpManager } from "@/views/static-content/components/faq-help-manager";
import { ContactUsEditor } from "@/views/static-content/components/contact-us-editor";
import { updateStaticContent, getStaticContentByType } from "@/services/dashboard/staticcontent";
import { toast } from "sonner";
import { PageLoader } from "@/components/ui/loading-spinner";

// Define the available page types as constant menu items
const PAGE_TYPES = [
    // { id: 'about_us', title: 'About Us' },
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
  const [loading, setLoading] = useState(initialLoading || false);

  const fetchContentByType = async (type) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await getStaticContentByType(token, type);
      if (res?.success && res?.data) {
        setPageContent({
          ...res.data,
          id: type,
        });
      } else {
        setPageContent({
          id: type,
          type: type,
          title: PAGE_TYPES.find(p => p.id === type)?.title || '',
          content: ''
        });
      }
    } catch (error) {
      console.error("Failed to fetch static content:", error);
      setPageContent({
        id: type,
        type: type,
        title: PAGE_TYPES.find(p => p.id === type)?.title || '',
        content: ''
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentByType(selectedPageId);
  }, [selectedPageId]);


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

        {/* Content Area Conditionally Rendered */}
        {selectedPageId === 'contact_us' ? (
            <ContactUsEditor />
        ) : (selectedPageId === 'faq' || selectedPageId === 'help_center') ? (
            <FaqHelpManager 
                type={selectedPageId} 
                title={PAGE_TYPES.find(p => p.id === selectedPageId)?.title || ''} 
            />
        ) : loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <div className="dot-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="dot-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="dot-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <style>{`
                    .dot-bounce {
                        width: 10px; height: 10px; background-color: #301960; border-radius: 50%;
                        animation: bounce 1.4s infinite ease-in-out both;
                    }
                    @keyframes bounce {
                        0%, 80%, 100% { transform: scale(0); }
                        40% { transform: scale(1); }
                    }
                `}</style>
            </div>
        ) : (
            <ContentEditor
                page={pageContent}
                onSave={handleSave}
                saving={saving}
            />
        )}
      </div>
    </div>
  );
}
