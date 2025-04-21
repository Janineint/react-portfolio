function Header({ name, title, description, profileImageSrc }) {
  // Default values if props are missing
  const displayName = name || "Hi, my name is Janine";
  const displayTitle = title || "I am an UX/UI designer";

  return (
    // Use class names matching the CSS you have (e.g., logo-hero from style.css)
    <section id="about" className="logo-hero">
      {/* Profile Image */}
      <img src={profileImageSrc} alt="Profile" />

      {/* Text Content Container */}
      <div>
        {/* Display Name as H1 */}
        <h1>{displayName}</h1>

        {/* Display Title as H2 (or adjust tag/styling as needed) */}
        <h2>{displayTitle}</h2>

        {/* Display Description */}
        <p>{description}</p>
      </div>
    </section>
  );
}

export default Header;