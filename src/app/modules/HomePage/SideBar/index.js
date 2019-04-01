import React from 'react';
import { Link } from 'react-router-dom';

const SieBar = () => (
  <div className="side-bar">
    <ul className="demo-links">
      <li>
        <Link to="/portfolio/coaching">Technical Coaching</Link>
      </li>
      <li>
        <Link to="/portfolio/xyz">Interaction Design </Link>
      </li>
      <li>
        <Link to="/portfolio/xyz">Visual Design </Link>
      </li>
      <li>
        <Link to="/portfolio/xyz">Frontend Development </Link>
      </li>
      <li>
        <Link to="/portfolio/xyz">Test Automation </Link>
      </li>
      <li>
        <Link to="/portfolio/xyz">Continuous Integration</Link>
      </li>
    </ul>
  </div>
);

export default SieBar;
