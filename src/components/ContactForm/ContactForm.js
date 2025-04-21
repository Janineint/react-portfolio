import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const API_URL = 'http://localhost:7000/api/contact'; // Keep or update API endpoint

  const handleChange = (e) => {
    const { id, value } = e.target; // Use id to match state keys
    setFormData(prevState => ({
      ...prevState,
      [id]: value // Use id (name, Email, message)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    // Map form IDs to expected API fields if necessary
    const payload = {
        name: formData.name,
        email: formData.Email, // Use the id 'Email' from the input
        message: formData.message
    };

    axios.post(API_URL, payload)
      .then(response => {
        setStatus('Message sent successfully!');
        setFormData({ name: '', Email: '', message: '' }); // Clear form using IDs
      })
      .catch(error => {
        console.error("Error sending message:", error);
        setStatus('Failed to send message. Please try again.');
      });
  };

  return (
    // Add id for potential navigation
    <section id="contact" className="contact-form">
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        {/* Use placeholder attribute as label is not present in HTML */}
        <input
          type="text"
          id="name" // Matches state key
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email" // Changed type to email for validation
          id="Email" // Matches state key
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          required
        />
        <textarea
          id="message" // Matches state key
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
        {status && <p className="status-message">{status}</p>}
      </form>
    </section>
  );
}

export default ContactForm;