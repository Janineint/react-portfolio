import React from 'react';

// Using placeholder for missing images
const PLACEHOLDER_IMAGE = '/assets/placeholder.png'; // Adjust path if needed

// Icons (Placeholders - replace if using an icon library)
const LinkIconPlaceholder = () => <>🔗</>;
const DeleteIconPlaceholder = () => <>🗑️</>; // Example delete icon

// Added onDelete prop to handle deletion
function ProjectCard({ project, onDelete }) {
    // Use default values if project data is missing
    const imageUrl = project?.image || PLACEHOLDER_IMAGE;
    const title = project?.title || 'Project Title';
    const description = project?.description || 'No description available.';
    const linkUrl = project?.link || '#';
    const projectId = project?._id; // Get the project ID

    const handleDeleteClick = () => {
        // Prevent deleting if ID is missing
        if (!projectId) {
            console.error("Project ID is missing, cannot delete.");
            // Optionally show an error message to the user
            return;
        }
        // Confirm before deleting (optional but recommended)
        if (window.confirm(`Are you sure you want to delete the project "${title}"?`)) {
           // Call the function passed down from ProjectList
           onDelete(projectId);
        }
    };

    return (
        <div className="project-card-target">
            <div className="project-card-target-image-wrapper">
                 <img
                    src={imageUrl}
                    alt={`${title} screenshot`}
                    className="project-card-target-image"
                    onError={(e) => { e.target.onerror = null; e.target.src=PLACEHOLDER_IMAGE }}
                />
            </div>

            <div className="project-card-target-content">
                <h3>{title}</h3>
                <p>{description}</p>
                {/* Container for links/buttons at the bottom */}
                <div className="project-card-actions">
                    <a
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-target-link"
                     >
                        <LinkIconPlaceholder />
                        <span>View Project</span>
                    </a>
                    {/* Add Delete Button */}
                    <button
                        onClick={handleDeleteClick}
                        className="project-card-delete-button"
                        aria-label={`Delete project ${title}`} // Accessibility
                        disabled={!projectId} // Disable if no ID
                    >
                         <DeleteIconPlaceholder />
                         <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;