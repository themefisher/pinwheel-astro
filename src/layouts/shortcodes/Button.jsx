import React from "react";
import PropTypes from "prop-types";
const Button = ({ 
  href, 
  style, 
  children,
  rel 
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

Button.propTypes = {
  href: PropTypes.string,
  style: PropTypes.oneOf(["primary", "secondary"]),
  children: PropTypes.node,
  rel: PropTypes.string,
};
Button.defaultProps = {
  href: "/",
  style: "secondary",
  children: "Click Me",
  rel: "noopener noreferrer",
};

export default Button;
