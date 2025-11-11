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

export default function ProjectsPage() {
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

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'scenes', label: 'Scenes' },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [projectsData, scenesData] = await Promise.all([
          projectController.getAllProjects(),
          projectController.getAllScenes(),
        ]);
        setProjects(projectsData);
        setScenes(scenesData);
        setFilteredProjects(projectsData);
        setFilteredScenes(scenesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
          project.title.toLowerCase().includes(query) ||
          project.director.toLowerCase().includes(query) ||
          project.id.toLowerCase().includes(query) ||
          project.status.toLowerCase().includes(query)
      );
      setFilteredProjects(filtered);
    } else {
      const filtered = scenes.filter(
        (scene) =>
          scene.title.toLowerCase().includes(query) ||
          scene.actor.toLowerCase().includes(query) ||
          scene.id.toLowerCase().includes(query)
      );
      setFilteredScenes(filtered);
    }
  }, [searchQuery, activeTab, projects, scenes]);

  const handleViewProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsProjectModalOpen(true);
    }
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
      
      // In a real app, call API to update project
      console.log(`Project ${projectId} updated:`, updatedData);
    } catch (error) {
      console.error('Failed to save project:', error);
      throw error;
    }
  };

  const handleDeleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      setFilteredProjects((prev) => prev.filter((project) => project.id !== projectId));
      console.log(`Delete project ${projectId}`);
      // In a real app, call API to delete
    }
  };

  const handleViewScene = (sceneId) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (scene) {
      setSelectedScene(scene);
      setIsSceneModalOpen(true);
    }
  };

  const handleDeleteScene = (sceneId) => {
    if (confirm('Are you sure you want to delete this scene?')) {
      setScenes((prev) => prev.filter((scene) => scene.id !== sceneId));
      setFilteredScenes((prev) => prev.filter((scene) => scene.id !== sceneId));
      console.log(`Delete scene ${sceneId}`);
      // In a real app, call API to delete
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
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
                No projects found
              </div>
            )}
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
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
                No scenes found
              </div>
            )}
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
      <EditProjectModal
        project={selectedProject}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleSaveProject}
      />

      {/* Scene Details Modal */}
      <SceneDetailsModal
        scene={selectedScene}
        open={isSceneModalOpen}
        onOpenChange={setIsSceneModalOpen}
      />
    </div>
  );
}
