"use client";

import { useState, useEffect } from "react";
import { ProjectTabs } from "@/views/projects/components/project-tabs";
import { ProjectSearch } from "@/views/projects/components/project-search";
import { ProjectTable } from "@/views/projects/components/project-table";
import { SceneTable } from "@/views/projects/components/scene-table";
import { ProjectDetailsModal } from "@/views/projects/components/project-details-modal";
import { EditProjectModal } from "@/views/projects/components/edit-project-modal";
import { SceneDetailsModal } from "@/views/projects/components/scene-details-modal";
import { projectController } from "@/controllers/project.controller";
import { getAllScenes, getProjectDetails, updateProject, deleteProject, getSceneDetails, deleteScene } from "@/services/dashboard/project";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectsClient({ projects: initialProjects, projectPagination, onProjectPageChange, loading: initialLoading }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [scenes, setScenes] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filteredScenes, setFilteredScenes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSceneModalOpen, setIsSceneModalOpen] = useState(false);
  const [currentScenePage, setCurrentScenePage] = useState(1);
  const [scenePagination, setScenePagination] = useState(null);

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'scenes', label: 'Scenes' },
  ];

  useEffect(() => {
    async function fetchData() {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        try {
            if (activeTab === 'projects') {
                if (projects && projects.length > 0) {
                     setFilteredProjects(projects);
                }
            } else if (activeTab === 'scenes') {
                const scenesRes = await getAllScenes(token, currentScenePage);
                if (scenesRes?.success) {
                   const scenesData = scenesRes.data?.data?.data || scenesRes.data?.data || [];
                   setScenes(scenesData);
                   setFilteredScenes(scenesData);
                   setScenePagination(scenesRes.data?.data || null);
                }
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    }

    if (activeTab === 'scenes' || (activeTab === 'projects' && (!projects || projects.length === 0))) {
         // Only fetch if we need data. Initial load passed projects via props, but scenes need fetching.
         // Actually, initial load passed projects in 'projects' prop, but we need to set them to state initially?
         // The props are passed to component: function ProjectsClient({ projects: initialProjects, loading: initialLoading })
         // But the component definition in line 13 is: export default function ProjectsClient() {
         // It should be export default function ProjectsClient({ projects, loading }) {
         // And we should use that initial data.
         fetchData();
    }
  }, [activeTab, currentScenePage]);
  
  // Initialize projects from props
  useEffect(() => {
      if (initialProjects) {
          setProjects(initialProjects);
          setFilteredProjects(initialProjects);
          setLoading(false);
      }
  }, [initialProjects]);

  // Filter data based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProjects(projects);
      setFilteredScenes(scenes);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    if (activeTab === 'projects') {
      const filtered = projects.filter(
        (project) =>
          project.title?.toLowerCase().includes(query) ||
          project.director?.toLowerCase().includes(query) ||
          String(project.id).toLowerCase().includes(query) ||
          project.status?.toLowerCase().includes(query)
      );
      setFilteredProjects(filtered);
    } else {
      const filtered = scenes.filter(
        (scene) =>
          scene.title?.toLowerCase().includes(query) ||
          scene.actor?.toLowerCase().includes(query) ||
          String(scene.id).toLowerCase().includes(query)
      );
      setFilteredScenes(filtered);
    }
  }, [searchQuery, activeTab, projects, scenes]);

  const handleViewProject = async (projectId) => {
    // Ideally fetch details from API for view, but we have list data. 
    // User requested: "when user click view the api:/admin/project/show/1"
    const token = localStorage.getItem("token");
    const res = await getProjectDetails(token, projectId);
    
    if (res?.success && res.data?.data?.length > 0) {
        setSelectedProject(res.data.data[0]);
    } else {
        // Fallback to local data if API fails or is slow, or just use what we have?
        // Better to rely on API response for "details".
        const project = projects.find(p => p.id === projectId);
        setSelectedProject(project);
    }
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveProject = async (projectId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await updateProject(token, projectId, updatedData);
      
      if (res?.success) {
          // Update the project in the state
          setProjects((prev) =>
            prev.map((project) =>
              project.id === projectId
                ? { ...project, ...updatedData }
                : project
            )
          );
          
          // Update filtered projects as well
          setFilteredProjects((prev) =>
            prev.map((project) =>
              project.id === projectId
                ? { ...project, ...updatedData }
                : project
            )
          );
          console.log(`Project ${projectId} updated:`, updatedData);
          setIsEditModalOpen(false); // Close modal on success
      } else {
          console.error("Failed to update project API");
      }

    } catch (error) {
      console.error('Failed to save project:', error);
      // throw error; // Don't throw, handle it
    }
  };

  const handleDeleteProject = (projectId) => {
    toast("Are you sure you want to delete this project?", {
      action: {
        label: "Delete",
        onClick: () => executeDeleteProject(projectId),
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  const executeDeleteProject = async (projectId) => {
      const token = localStorage.getItem("token");
      const res = await deleteProject(token, projectId);
      
      if (res?.success) {
          setProjects((prev) => prev.filter((project) => project.id !== projectId));
          setFilteredProjects((prev) => prev.filter((project) => project.id !== projectId));
          toast.success(`Project deleted successfully`);
      } else {
          console.error("Failed to delete project");
          toast.error("Failed to delete project");
      }
  };

  const handleViewScene = async (sceneId) => {
    // Similar to project view, fetch details
    const token = localStorage.getItem("token");
    const res = await getSceneDetails(token, sceneId);
    
    if (res?.success && res.data?.data?.length > 0) { // Assuming similar structure
         setSelectedScene(res.data.data[0]); // Check response structure for scenes view
    } else if (res?.success && res.data?.data) { // Or maybe it returns object directly
         // Check user prompt: "view:/admin/scene/show/4" but didn't give response example for scene view.
         // Project view returned array in data.data[0]. 
         // Assuming consistent. If it's single object, standard res.data.data.
         setSelectedScene(res.data.data); 
    } else {
        const scene = scenes.find(s => s.id === sceneId);
        setSelectedScene(scene);
    }
    setIsSceneModalOpen(true);
  };

  const handleDeleteScene = (sceneId) => {
    toast("Are you sure you want to delete this scene?", {
      action: {
        label: "Delete",
        onClick: () => executeDeleteScene(sceneId),
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  const executeDeleteScene = async (sceneId) => {
       const token = localStorage.getItem("token");
       console.log("Deleting scene with ID:", sceneId); // Debug log
       const res = await deleteScene(token, sceneId);
       console.log("Delete scene response:", res); // Debug log
       
       if (res?.success) {
          setScenes((prev) => prev.filter((scene) => scene.id !== sceneId));
          setFilteredScenes((prev) => prev.filter((scene) => scene.id !== sceneId));
          toast.success(`Scene deleted successfully`);
       } else {
           console.error("Failed to delete scene", res);
           toast.error(res?.message || "Failed to delete scene");
       }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{ color: '#666666' }}>Loading...</div>
      </div>
    );
  }

  const renderPagination = (pagination, onPageChange) => {
    if (!pagination || !pagination.links || pagination.links.length <= 3) return null;
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderTop: '1px solid #f3f4f6', marginTop: '16px' }}>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: 600, color: '#111827' }}>{pagination.from || 0}</span> to <span style={{ fontWeight: 600, color: '#111827' }}>{pagination.to || 0}</span> of <span style={{ fontWeight: 600, color: '#111827' }}>{pagination.total || 0}</span> results
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {pagination.links.map((link, index) => {
            const isPrev = link.label.includes('Previous');
            const isNext = link.label.includes('Next');
            
            const extractPage = (url) => {
              if (!url) return null;
              try {
                const urlObj = new URL(url);
                return urlObj.searchParams.get('page');
              } catch (e) {
                const match = url.match(/page=(\d+)/);
                return match ? match[1] : null;
              }
            };
            
            const pageNum = link.page || extractPage(link.url);

            return (
              <button
                key={index}
                disabled={!link.url}
                onClick={() => {
                  if (link.url && onPageChange && pageNum) {
                    onPageChange(Number(pageNum));
                  }
                }}
                style={{
                  padding: isPrev || isNext ? '6px 8px' : '6px 12px',
                  borderRadius: '8px',
                  border: link.active ? '1px solid #1a1a1a' : '1px solid #e5e7eb',
                  backgroundColor: link.active ? '#1a1a1a' : (link.url ? '#fff' : '#f9fafb'),
                  color: link.active ? '#fff' : (link.url ? '#1a1a1a' : '#9ca3af'),
                  cursor: link.url ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: link.active ? '600' : '500',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '36px',
                  height: '36px',
                  boxShadow: link.active ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                }}
                onMouseOver={(e) => {
                  if (link.url && !link.active) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }
                }}
                onMouseOut={(e) => {
                  if (link.url && !link.active) {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }
                }}
              >
                {isPrev ? <ChevronLeft size={16} /> : isNext ? <ChevronRight size={16} /> : <span dangerouslySetInnerHTML={{ __html: link.label }} />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px', margin: 0 }}>
          Project & Scene Management
        </h1>
        <p style={{ fontSize: '16px', color: '#666666', margin: 0 }}>
          Manage casting calls and user-uploaded scenes
        </p>
      </div>

      {/* Tabs */}
      <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      {/* Content */}
      {activeTab === 'projects' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>All Projects</h2>
            <ProjectSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search projects..." />
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            {filteredProjects.length > 0 ? (
              <ProjectTable
                projects={filteredProjects}
                onView={handleViewProject}
                // onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                paginationFrom={projectPagination?.from || 1}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
                No projects found
              </div>
            )}
            {activeTab === 'projects' && !searchQuery && renderPagination(projectPagination, onProjectPageChange)}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>All Scenes</h2>
            <ProjectSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search scenes..." />
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            {filteredScenes.length > 0 ? (
              <SceneTable
                scenes={filteredScenes}
                onView={handleViewScene}
                onDelete={handleDeleteScene}
                paginationFrom={scenePagination?.from || 1}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
                No scenes found
              </div>
            )}
            {activeTab === 'scenes' && !searchQuery && renderPagination(scenePagination, setCurrentScenePage)}
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        open={isProjectModalOpen}
        onOpenChange={setIsProjectModalOpen}
      />

      {/* Edit Project Modal */}
      {/* <EditProjectModal
        project={selectedProject}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleSaveProject}
      /> */}

      {/* Scene Details Modal */}
      <SceneDetailsModal
        scene={selectedScene}
        open={isSceneModalOpen}
        onOpenChange={setIsSceneModalOpen}
      />
    </div>
  );
}
