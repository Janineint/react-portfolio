import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../ProjectCard/ProjectCard';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null); // Separate error for fetching
  const [deleteStatus, setDeleteStatus] = useState(''); // Status for delete operations

  const API_URL = 'http://localhost:7000/api/projects';

  // Fetch initial projects
  useEffect(() => {
    setLoading(true);
    axios.get(API_URL)
      .then(response => {
        setProjects(Array.isArray(response.data) ? response.data : []);
        setFetchError(null);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
         if (err.response) {
             setFetchError(`Error fetching: ${err.response.status} - ${err.response.statusText}. Check API.`);
         } else if (err.request) {
             setFetchError('Error fetching: No response from API. Check backend/CORS.');
         } else {
            setFetchError(`Failed to load projects. Error: ${err.message}`);
         }
      })
      .finally(() => {
          setLoading(false);
      });
  }, []);

  // Function to handle project deletion, aligned with backend responses
  const handleDeleteProject = (projectId) => {
      setDeleteStatus('Deleting...');

      axios.delete(`${API_URL}/${projectId}`)
        .then(response => {
            // Backend returns 200 with message on success
            setProjects(prevProjects => prevProjects.filter(p => p._id !== projectId));
            setDeleteStatus(response.data.message || 'Project deleted successfully.'); // Use backend message
            setFetchError(null); // Clear fetch errors if delete is successful
            setTimeout(() => setDeleteStatus(''), 3000);
        })
        .catch(err => {
            console.error("Error deleting project:", err);
             if (err.response) {
                // Handle specific errors based on backend logic
                if (err.response.status === 404) {
                    setDeleteStatus(`Error: ${err.response.data.message || 'Project not found.'}`);
                } else if (err.response.status === 400) {
                     setDeleteStatus(`Error: ${err.response.data.message || 'Invalid request (e.g., bad ID format).'}`);
                } else {
                    // Other server errors (e.g., 500)
                    setDeleteStatus(`Error deleting: ${err.response.data.message || err.response.statusText} (${err.response.status})`);
                }
             } else if (err.request) {
                setDeleteStatus('Error deleting: No response from server.');
             } else {
                setDeleteStatus(`Error deleting: ${err.message}`);
             }
        });
  };

  // --- Render Logic ---

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <section id="projects">
      <div className="text-hero">
        <p className="but">Experience</p>
        <p>Here are some of the projects I've worked on:</p>
      </div>

      {/* Display fetch error */}
      {fetchError && <p style={{ color: 'red', fontWeight: 'bold', padding: '1rem', border: '1px solid red', backgroundColor: '#ffeeee', textAlign: 'center', margin: '1rem auto', maxWidth: '800px' }}>{fetchError}</p>}

      {/* Display delete status */}
      {deleteStatus && <p style={{ color: deleteStatus.startsWith('Error') ? 'red' : 'green', fontWeight: 'bold', textAlign: 'center', margin: '0.5rem 0' }}>{deleteStatus}</p>}

      <div className="project-list-container">
        {projects.length > 0 ? (
          projects.map(project => (
            <ProjectCard
                key={project._id}
                project={project}
                onDelete={handleDeleteProject} // Pass the handler
            />
          ))
        ) : (
           !fetchError && <p>No projects found.</p> // Show only if no fetch error occurred
        )}
      </div>
    </section>
  );
}

export default ProjectList;