import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; 
import HomePage from './pages/HomePage';
import AddSkillPage from './pages/AddSkillPage';
import AddProjectPage from './pages/AddProjectPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    // No outer div needed usually, handled by Layout/Pages
    <Routes>
      <Route path="/" element={<MainLayout />}> {/* Use MainLayout for shared structure */}
        <Route index element={<HomePage />} /> {/* Default page */}
        <Route path="add-skill" element={<AddSkillPage />} />
        <Route path="add-project" element={<AddProjectPage />} />
        {/* Add other routes using the MainLayout here */}
      </Route>
      {/* Add routes without MainLayout (e.g., login page) here if needed */}
    </Routes>
  );
}

export default App;