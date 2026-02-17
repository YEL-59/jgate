"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { CategoryTable } from "@/views/category/components/category-table";
import { CategoryModal } from "@/views/category/components/category-modal";
import { DeleteCategoryModal } from "@/views/category/components/delete-category-modal";
import { categoryController } from "@/controllers/category.controller";
import { toast } from "sonner";
import { PageLoader } from "@/components/ui/loading-spinner";

export default function CategoryContent() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await categoryController.getAllCategories();
      setCategories(data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      let response;
      if (selectedCategory) {
        response = await categoryController.updateCategory(selectedCategory.id, formData);
      } else {
        response = await categoryController.createCategory(formData);
      }

      if (response && response.success) {
        toast.success(response.message || `Category ${selectedCategory ? 'updated' : 'created'} successfully`);
        setIsModalOpen(false);
        fetchData();
      } else {
        toast.error(response?.message || `Failed to ${selectedCategory ? 'update' : 'create'} category`);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;
    
    try {
      const response = await categoryController.deleteCategory(selectedCategory.id);
      if (response && response.success) {
        toast.success(response.message || 'Category deleted successfully');
        setIsDeleteModalOpen(false);
        fetchData();
      } else {
        toast.error(response?.message || 'Failed to delete category');
      }
    } catch (error) {
      toast.error('An error occurred while deleting category');
    }
  };

  if (loading) {
    return <PageLoader message="Fetching categories..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
            Project Categories
          </h1>
          <p style={{ fontSize: '16px', color: '#666666', marginTop: '8px' }}>
            Manage categories for your film projects and movies
          </p>
        </div>
        <button
          onClick={handleAddClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#FFC107',
            color: '#1a1a1a',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FBBF24'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC107'}
        >
          <Plus size={18} />
          Add New Category
        </button>
      </div>

      {/* Categories Table */}
      <div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {categories && categories.length > 0 ? (
            <CategoryTable
              categories={categories}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
              No categories found. Create your first category to get started.
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        category={selectedCategory}
        onSubmit={handleSubmit}
      />

      <DeleteCategoryModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={confirmDelete}
        itemName={selectedCategory?.name}
      />
    </div>
  );
}
