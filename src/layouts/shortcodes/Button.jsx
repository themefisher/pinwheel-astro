import React from "react";

const Button = ({ 
  href = "#", 
  style = "secondary", 
  children = "Click Me", 
  rel = "noopener noreferrer" 
}) => {
  const buttonStyles = {
    primary: "bg-palette-blue text-white border border-palette-navy hover:text-palette-lightBlue",
    secondary: "bg-white text-palette-blue border border-palette-blue hover:text-palette-navy hover:border-palette-navy",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      aria-label={`${children} (opens in a new tab)`}
      className={`inline-block px-5 py-3 rounded transition-all ${
        buttonStyles[style]
      }`}
    >
      {children}
    </a>
  );
};

export default Button;
