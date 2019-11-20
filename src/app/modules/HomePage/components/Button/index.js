import React from 'react';

const Button = ({
  onClick = () => {},
  // eslint-disable-next-line no-script-url
  href = 'javascript:void(0)',
  children
}) => (
  <a
    className="theme-button"
    onClick={onClick}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default Button;
