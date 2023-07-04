import React from "react";

function SubmitButton({ type, className, id, children }) {
  return (
    <button type={type} className={className} id={id}>
      {children}
    </button>
  );
}

export default SubmitButton;
