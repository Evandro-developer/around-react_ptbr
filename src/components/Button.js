import React from "react";

function Button({ type, className, id, children }) {
  return (
    <button type={type} className={className} id={id}>
      {children}
    </button>
  );
}

export default Button;
