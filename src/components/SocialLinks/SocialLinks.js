import React from 'react';

// Placeholder data - replace with your actual links and image paths
const socialLinksData = [
  { name: 'LinkedIn', iconSrc: '/assets/placeholder.png', url: '#' },
  { name: 'Facebook', iconSrc: '/assets/placeholder.png', url: '#' },
  { name: 'Instagram', iconSrc: '/assets/placeholder.png', url: '#' },
  { name: 'Twitter', iconSrc: '/assets/placeholder.png', url: '#' },
];

function SocialLinks() {
  return (
    <div className="contact-logo">
      {socialLinksData.map(link => (
        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
          <img src={link.iconSrc} alt={link.name} />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;