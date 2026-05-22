"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { MovieTable } from "@/views/movie-library/components/movie-table";
import { MovieModal } from "@/views/movie-library/components/movie-modal";
import { DeleteMovieModal } from "@/views/movie-library/components/delete-movie-modal";
import { VideoPlayerModal } from "@/views/movie-library/components/video-player-modal";
import { movieController } from "@/controllers/movie.controller";
import { toast } from "sonner";
import { PageLoader } from "@/components/ui/loading-spinner";

export default function MovieLibraryContent() {
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await movieController.getAllMovies(currentPage);
      setMovies(data?.data || (Array.isArray(data) ? data : []));
      setPagination(data?.links ? data : null);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      toast.error('Failed to fetch movie library');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleAddClick = () => {
    setSelectedMovie(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setIsDeleteModalOpen(true);
  };

  const handleViewVideo = (movie) => {
    setSelectedMovie(movie);
    setIsVideoModalOpen(true);
  };

  const handleSubmit = async (formDataObj) => {
    try {
      const nativeFormData = new FormData();
      nativeFormData.append('title', formDataObj.title);
      nativeFormData.append('description', formDataObj.description || '');
      
      // The backend requires the video field even on update.
      // We pass the string URL if no new file is uploaded.
      if (formDataObj.video) {
        nativeFormData.append('video', formDataObj.video);
      }
      
      nativeFormData.append('cat_id', formDataObj.cat_id);
      if (formDataObj.rating) {
        nativeFormData.append('rating', formDataObj.rating);
      }

      let response;
      if (selectedMovie) {
        response = await movieController.updateMovie(selectedMovie.id, nativeFormData);
      } else {
        response = await movieController.createMovie(nativeFormData);
      }

      if (response && response.success) {
        toast.success(response.message || `Movie ${selectedMovie ? 'updated' : 'added'} successfully`);
        setIsModalOpen(false);
        fetchData();
      } else {
        toast.error(response?.message || `Failed to ${selectedMovie ? 'update' : 'add'} movie`);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const confirmDelete = async () => {
    if (!selectedMovie) return;
    
    try {
      const response = await movieController.deleteMovie(selectedMovie.id);
      if (response && response.success) {
        toast.success(response.message || 'Movie removed from library');
        setIsDeleteModalOpen(false);
        fetchData();
      } else {
        toast.error(response?.message || 'Failed to delete movie');
      }
    } catch (error) {
      toast.error('An error occurred while deleting movie');
    }
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (movie.category?.name && movie.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <PageLoader message="Fetching movie library..." />;
  }

  const renderPagination = () => {
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
                  if (link.url && pageNum) {
                    setCurrentPage(Number(pageNum));
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
            Movie Library
          </h1>
          <p style={{ fontSize: '16px', color: '#666666', marginTop: '8px' }}>
            Curate and manage your collection of movies and videos
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
          Add New Movie
        </button>
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <div style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }}>
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white'
            }}
          />
        </div>
      </div>

      {/* Movie Table */}
      <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '800px' }}>
          {filteredMovies && filteredMovies.length > 0 ? (
            <MovieTable
              movies={filteredMovies}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onViewVideo={handleViewVideo}
              paginationFrom={pagination?.from || 1}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
              {searchTerm ? 'No movies match your search.' : 'No movies found. Add your first movie to the library.'}
            </div>
          )}
          {!searchTerm && renderPagination()}
        </div>
      </div>

      {/* Modals */}
      <MovieModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        movie={selectedMovie}
        onSubmit={handleSubmit}
      />

      <DeleteMovieModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={confirmDelete}
        itemName={selectedMovie?.title}
      />

      <VideoPlayerModal
        open={isVideoModalOpen}
        onOpenChange={setIsVideoModalOpen}
        videoUrl={selectedMovie?.video}
        title={selectedMovie?.title}
      />
    </div>
  );
}
