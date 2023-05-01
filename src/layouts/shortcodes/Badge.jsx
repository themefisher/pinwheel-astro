import React from "react";

const Badge = ({ type, children }) => {
  return <span className={`badge ${type}`}>{children}</span>;
};

export default Badge;
