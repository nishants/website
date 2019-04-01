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

    <label>Previous</label>
    <ul className="previous-links">
      <li>
        <Link to="/work-history/xyz">ThoughtWorks</Link>
      </li>
      <li>
        <Link to="/work-history/xyz"> Oracle</Link>
      </li>
      <li>
        <Link to="/work-history/xyz"> Infosys</Link>
      </li>
    </ul>

    <label>Connect</label>
    <ul className="social-links">
      <li className="github">
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nishants"
        >
          <i className="fab fa-github" />Github
        </a>
      </li>
      <li className="stack-overflow">
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://stackoverflow.com/users/1065020/dawn"
        >
          <i className="fab fa-stack-overflow" />StackOveflow
        </a>
      </li>
      <li className="twitter">
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/nshnt_sng"
        >
          <i className="fab fa-twitter" />Twitter
        </a>
      </li>
      <li className="linkedin">
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/nishant-singh-b2420946"
        >
          <i className="fab fa-linkedin" />Linkedin
        </a>
      </li>
    </ul>
  </div>
);

export default SieBar;
