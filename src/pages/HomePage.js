import React from 'react';
import Header from '../components/Header/Header';
import Skills from '../components/Skills/Skills';
import ProjectList from '../components/ProjectList/ProjectList';
import ContactForm from '../components/ContactForm/ContactForm';
import SocialLinks from '../components/SocialLinks/SocialLinks';

// Import placeholder image (or use actual image paths if you add them)
import profilePlaceholder from '../assets/placeholder.png';

function HomePage() {
  return (
    <> {/* Use Fragment to avoid unnecessary div */}
      <Header
        name="Hi, my name is Janine"
        title="I am an UX/UI designer"
        description="Let's work together. From interaction design to scalable design systems, single-page apps to something more experimental with WebGL. I help awesome people to build ambitious yet accessible web projects - the wilder, the better."
        profileImageSrc={profilePlaceholder} 
      />
      <Skills />
      <ProjectList /> {/* This component handles the "Experience" section */}
      <ContactForm />
      {/* <SocialLinks /> */}
    </>
  );
}

export default HomePage;