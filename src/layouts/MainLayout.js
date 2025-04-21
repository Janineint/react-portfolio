import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet renders the matched child route element
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

// Import placeholder image or actual logo path
import logoPlaceholder from '../assets/janine-logo.png';

function MainLayout() {
  return (
    <div>
      {/* Pass necessary props to Navbar */}
      <Navbar logoSrc={logoPlaceholder} />
      <main>
        {/* Child route components (HomePage, AddSkillPage, etc.) will render here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;