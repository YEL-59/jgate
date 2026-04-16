"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { MovieTable } from "@/views/movie-library/components/movie-table";
import { MovieModal } from "@/views/movie-library/components/movie-modal";
import { DeleteMovieModal } from "@/views/movie-library/components/delete-movie-modal";
import { VideoPlayerModal } from "@/views/movie-library/components/video-player-modal";
import { movieController } from "@/controllers/movie.controller";
import { toast } from "sonner";
import { PageLoader } from "@/components/ui/loading-spinner";

export default function MovieLibraryContent() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await movieController.getAllMovies();
      setMovies(data || []);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      toast.error('Failed to fetch movie library');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
              {searchTerm ? 'No movies match your search.' : 'No movies found. Add your first movie to the library.'}
            </div>
          )}
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
