import React from 'react';

const DeleteIconPlaceholder = () => <>🗑️</>; // Placeholder

function SkillItem({ skill, onDelete }) {
  const skillId = skill?._id;

  const handleDeleteClick = () => {
    if (!skillId) {
      console.error("Skill ID missing.");
      return;
    }
    // Optional: Confirm before deleting
    // if (window.confirm(`Delete skill "${skill.name}"?`)) {
       onDelete(skillId);
    // }
  };

  return (
    <div className="skill-item">
      <span className="skill-name">{skill?.name || 'Unnamed Skill'}</span>
      <span className="skill-level">({skill?.level || 'No Level'})</span>
      <button
        onClick={handleDeleteClick}
        className="skill-delete-button"
        aria-label={`Delete skill ${skill?.name}`}
        disabled={!skillId}
      >
        <DeleteIconPlaceholder />
      </button>
    </div>
  );
}

export default SkillItem;