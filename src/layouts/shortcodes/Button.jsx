import React from "react";

const Button = ({ 
  href = "#", 
  style = "secondary", 
  children = "Click Me", 
  rel = "noopener noreferrer" 
}) => {
  const buttonStyles = {
    primary: "bg-white text-black border border-black hover:bg-black hover:text-white",
    secondary: "bg-black text-white border border-black hover:bg-white hover:text-black",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      className={`inline-block px-5 py-3 rounded transition-all ${
        buttonStyles[style]
      }`}
    >
      {children}
    </a>
  );
};

export default Button;
