import React, { useState } from 'react';
import axios from 'axios';

function AddSkillPage() {
    const [formData, setFormData] = useState({ name: '', level: '' });
    const [status, setStatus] = useState('');

    const API_URL = 'https://portfolio-api-jyqy.onrender.com/api/skills'; // Use skills endpoint

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation based on backend check
        if (!formData.name || !formData.level) {
            setStatus('Error: Skill Name and Level are required.');
            return;
        }
        setStatus('Adding skill...');

        // Payload matches skillSchema and POST /api/skills requirement
        const payload = {
            name: formData.name,
            level: formData.level
        };

        axios.post(API_URL, payload)
            .then(response => {
                setStatus(`Skill "${response.data.name}" added successfully!`);
                setFormData({ name: '', level: '' }); // Clear form
                setTimeout(() => setStatus(''), 5000);
            })
            .catch(error => {
                console.error("Error adding skill:", error);
                const errorMsg = error.response?.data?.message || error.message;
                setStatus(`Error adding skill: ${errorMsg}`);
            });
    };

    return (
        <div className="contact-form" style={{marginTop: '4rem', marginBottom: '4rem'}}>
            <h1>Add New Skill</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Skill Name:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="e.g., React"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                 <div className="form-group">
                    <label htmlFor="level">Proficiency Level:</label>
                    <input // Or use a <select> dropdown
                        type="text"
                        id="level"
                        placeholder="e.g., Intermediate, Advanced, Familiar"
                        value={formData.level}
                        onChange={handleChange}
                        required
                    />
                    {/* Example Select Dropdown (replace input above if preferred)
                    <select id="level" value={formData.level} onChange={handleChange} required>
                         <option value="" disabled>Select Level</option>
                         <option value="Beginner">Beginner</option>
                         <option value="Intermediate">Intermediate</option>
                         <option value="Advanced">Advanced</option>
                         <option value="Expert">Expert</option>
                    </select>
                    */}
                </div>
                <button type="submit">Add Skill</button>
                {status && <p className={`status-message ${status.startsWith('Error') ? 'error' : 'success'}`}>{status}</p>}
            </form>
        </div>
    );
}

export default AddSkillPage;