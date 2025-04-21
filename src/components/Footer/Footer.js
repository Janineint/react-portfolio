import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Janine Intrakul. All rights reserved.</p>
      {/* Add links to GitHub, LinkedIn, etc. if desired */}
      {/* <p>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a> |
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p> */}
    </footer>
  );
}

export default Footer;