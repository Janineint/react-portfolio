import React, { useState } from 'react';
import axios from 'axios';

function AddProjectPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '', // Expecting a URL for the image
        link: ''   // Expecting a URL for the project link
    });
    const [status, setStatus] = useState('');

    // API endpoint remains the same
    const API_URL = 'http://localhost:7000/api/projects';

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic frontend check (optional, as backend also validates)
        if (!formData.title || !formData.description) {
             setStatus('Error: Title and Description are required.');
             return;
        }

        setStatus('Adding project...');

        const payload = {
            title: formData.title,
            description: formData.description,
            image: formData.image,
            link: formData.link,
        };

        axios.post(API_URL, payload)
            .then(response => {
                // Backend returns 201 on success with the saved project
                setStatus(`Project "${response.data.title}" added successfully!`);
                setFormData({ title: '', description: '', image: '', link: '' }); // Clear form
                // Optional: clear status after delay
                setTimeout(() => setStatus(''), 5000);
            })
            .catch(error => {
                console.error("Error adding project:", error);
                if (error.response) {
                    // Handle specific errors based on backend logic
                    if (error.response.status === 400) {
                        // Likely missing fields based on backend validation
                        setStatus(`Error: ${error.response.data.message || 'Missing required fields.'}`);
                    } else {
                        // Other server errors (e.g., 500)
                        setStatus(`Error: ${error.response.data.message || 'Failed to add project on server.'} (${error.response.status})`);
                    }
                } else if (error.request) {
                    // No response received
                    setStatus('Error: No response from server. Is it running?');
                } else {
                    // Error setting up the request
                    setStatus(`Error: ${error.message}`);
                }
            });
    };

    return (
        <div className="contact-form" style={{marginTop: '4rem', marginBottom: '4rem'}}>
            <h1>Add New Project</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Project Title:</label>
                    <input type="text" id="title" value={formData.title} onChange={handleChange} required />
                </div>
                 <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image" placeholder="https://example.com/image.jpg" value={formData.image} onChange={handleChange} required />
                </div>
                 <div className="form-group">
                    <label htmlFor="link">Project Link URL:</label>
                    <input type="text" id="link" placeholder="https://github.com/user/repo" value={formData.link} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={formData.description} onChange={handleChange} required />
                </div>

                <button type="submit">Add Project</button>
                {status && <p className="status-message">{status}</p>}
            </form>
        </div>
    );
}

export default AddProjectPage;