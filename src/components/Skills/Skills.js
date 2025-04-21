import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SkillItem from './SkillItem'; // Import the new component

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState('');

  const API_URL = 'http://localhost:7000/api/skills'; // API endpoint for skills

  useEffect(() => {
    setLoading(true);
    axios.get(API_URL)
      .then(response => {
        setSkills(Array.isArray(response.data) ? response.data : []);
        setFetchError(null);
      })
      .catch(err => {
        console.error("Error fetching skills:", err);
        setFetchError(`Failed to load skills. ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteSkill = (skillId) => {
    setDeleteStatus('Deleting skill...');
    axios.delete(`${API_URL}/${skillId}`)
      .then(response => {
        setSkills(prevSkills => prevSkills.filter(s => s._id !== skillId));
        setDeleteStatus(response.data.message || 'Skill deleted.');
        setFetchError(null);
        setTimeout(() => setDeleteStatus(''), 3000);
      })
      .catch(err => {
        console.error("Error deleting skill:", err);
        const errorMsg = err.response?.data?.message || err.message;
        setDeleteStatus(`Error deleting skill: ${errorMsg}`);
      });
  };

  return (
    <section id="skills">
      <div className="text-hero">
        <p className="but">Skills</p>
        <p>The skills, tools and technologies I use:</p>
      </div>

      {loading && <p>Loading skills...</p>}
      {fetchError && <p className="error-message">{fetchError}</p>}
      {deleteStatus && <p className={`status-message ${deleteStatus.startsWith('Error') ? 'error' : 'success'}`}>{deleteStatus}</p>}

      <div className="skill-list-container">
        {!loading && !fetchError && skills.length === 0 && <p>No skills listed yet.</p>}
        {skills.map((skill) => (
          <SkillItem
            key={skill._id}
            skill={skill}
            onDelete={handleDeleteSkill}
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;