import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import Link/NavLink

function Navbar({ logoSrc = "/assets/placeholder.png" }) {
  return (
    <nav className="navbar">
      <div className="logo">
        {/* Link the logo back to the homepage */}
        <Link to="/">
          <img src={logoSrc} alt="Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        {/* Use NavLink for active styling or Link for simple navigation */}
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>About</NavLink></li>
        {/* Removed Work link */}
        <li><NavLink to="/#contact" onClick={(e) => { // Simple scroll for contact on home page
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth'});
              } else {
                  // If not on home page, navigate first? Or just ignore?
                  // For simplicity, this only works if already on home page.
              }
            }}>Contact</NavLink>
        </li>
        <li><NavLink to="/add-skill" className={({ isActive }) => isActive ? 'active-link' : ''}>Add Skill</NavLink></li>
        <li><NavLink to="/add-project" className={({ isActive }) => isActive ? 'active-link' : ''}>Add Project</NavLink></li>
        <li><a href="https://drive.google.com/uc?export=download&id=1kdR6GGcgv0F30bX0yks246zc91Oid6Ul">Download Resume</a></li> {/* Keep external links or file links as <a> */}
      </ul>
    </nav>
  );
}

export default Navbar;

// Add some basic active link styling in App.css if you use NavLink
/*
.nav-links a.active-link {
  font-weight: bold;
  text-decoration: underline;
}
*/