"use client";

import { useState, useEffect } from "react";
import { PagesList } from "@/views/static-content/components/pages-list";
import { ContentEditor } from "@/views/static-content/components/content-editor";
import { staticContentController } from "@/controllers/static-content.controller";

export default function StaticContentPage() {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    function fetchData() {
      try {
        const pagesList = staticContentController.getStaticPages();
        setPages(pagesList);
        // Select first page by default
        if (pagesList.length > 0) {
          setSelectedPageId(pagesList[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch pages:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function loadPageContent() {
      if (!selectedPageId) return;

      try {
        setLoading(true);
        const content = await staticContentController.getPageContent(selectedPageId);
        setPageContent(content);
      } catch (error) {
        console.error('Failed to load page content:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPageContent();
  }, [selectedPageId]);

  const handlePageSelect = (pageId) => {
    setSelectedPageId(pageId);
  };

  const handleSave = async (pageId, title, content) => {
    try {
      setSaving(true);
      await staticContentController.savePageContent(pageId, title, content);
      alert('Content saved successfully!');
      // Reload the page content
      const updatedContent = await staticContentController.getPageContent(pageId);
      setPageContent(updatedContent);
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('Failed to save content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading && !pageContent) {
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
          pages={pages}
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
