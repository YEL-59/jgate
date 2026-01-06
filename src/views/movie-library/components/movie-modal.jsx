"use client";

import { useState, useEffect } from "react";
import { Plus, Save, Film, AlignLeft, Link, Tag, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { categoryController } from "@/controllers/category.controller";

export function MovieModal({ open, onOpenChange, movie, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video: '',
    cat_id: '',
    rating: ''
  });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || '',
        description: movie.description || '',
        video: movie.video || '',
        cat_id: movie.cat_id?.toString() || movie.category?.id?.toString() || '',
        rating: movie.rating?.toString() || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        video: '',
        cat_id: '',
        rating: ''
      });
    }
  }, [movie, open]);

  useEffect(() => {
    if (open) {
      const fetchCategories = async () => {
        try {
          setLoadingCategories(true);
          const data = await categoryController.getAllCategories();
          setCategories(data || []);
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        } finally {
          setLoadingCategories(false);
        }
      };
      fetchCategories();
    }
  }, [open]);

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.video.trim() || !formData.cat_id) {
      alert('Please fill in required fields (Title, Video URL, and Category)');
      return;
    }
    onSubmit(formData);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px 10px 40px',
    borderRadius: '8px',
    border: '1px solid #e5e5e5',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
    display: 'block'
  };

  const iconContainerStyle = {
    position: 'absolute',
    left: '12px',
    top: '38px',
    color: '#9CA3AF'
  };

  const fieldGroupStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            {movie ? 'Edit Movie' : 'Add New Movie'}
          </DialogTitle>
          <DialogDescription style={{ fontSize: '14px', color: '#666666', marginTop: '8px' }}>
            {movie 
              ? 'Update the details of this movie in the library.' 
              : 'Add a new movie to your library with its category and video link.'}
          </DialogDescription>
        </DialogHeader>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', padding: '16px 0' }}>
          {/* Title */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>
              Movie Title <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={iconContainerStyle}><Film size={18} /></div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. The Last Warrior"
              style={inputStyle}
            />
          </div>

          {/* Category Dropdown */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>
              Category <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={iconContainerStyle}><Tag size={18} /></div>
            <select
              value={formData.cat_id}
              onChange={(e) => setFormData(prev => ({ ...prev, cat_id: e.target.value }))}
              style={{ ...inputStyle, appearance: 'none' }}
              disabled={loadingCategories}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Video URL */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>
              Video URL <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={iconContainerStyle}><Link size={18} /></div>
            <input
              type="text"
              value={formData.video}
              onChange={(e) => setFormData(prev => ({ ...prev, video: e.target.value }))}
              placeholder="https://example.com/video.mp4"
              style={inputStyle}
            />
          </div>

          {/* Rating & Description Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Rating (Optional)</label>
              <div style={iconContainerStyle}><Star size={18} /></div>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                placeholder="4.5"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Description */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Description (Optional)</label>
            <div style={{ ...iconContainerStyle, top: '38px' }}><AlignLeft size={18} /></div>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter movie description..."
              style={{
                ...inputStyle,
                height: '100px',
                paddingTop: '10px',
                resize: 'none'
              }}
            />
          </div>
        </div>

        <DialogFooter style={{ marginTop: '8px' }}>
          <Button variant="outline" onClick={handleClose} className="hover:bg-gray-100">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#FFC107',
              color: '#1a1a1a',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            className="hover:bg-yellow-500"
          >
            {movie ? <Save size={16} /> : <Plus size={16} />}
            {movie ? 'Update Movie' : 'Add to Library'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
