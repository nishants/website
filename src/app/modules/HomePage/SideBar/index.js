import React from 'react';
import { Link } from 'react-router-dom';

const SieBar = ({ search }) => (
  <div className="side-bar">
    <ul className="demo-links">
      <li onClick={() => search('#coaching')}>
        <Link to="/portfolio?search=#coaching">Coaching/Consulting</Link>
      </li>
      <li onClick={() => search('#development')}>
        <Link to="/portfolio?search=#development">Fullstack Development</Link>
      </li>
      <li onClick={() => search('#open-source')}>
        <Link to="/portfolio?search=#open-source">Open Source</Link>
      </li>
      <li onClick={() => search('#testing')}>
        <Link to="/portfolio?search=#testing">Test Automation </Link>
      </li>
      <li onClick={() => search('#tdd')}>
        <Link to="/portfolio?search=#tdd">Test Driven Development</Link>
      </li>
      <li onClick={() => search('#frontend')}>
        <Link to="/portfolio?search=#frontend">Frontend Development</Link>
      </li>
      <li onClick={() => search('#design')}>
        <Link to="/portfolio?search=#design">Designs</Link>
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
          <i className="fab fa-github" />
          Github
        </a>
      </li>
      <li className="stack-overflow">
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://stackoverflow.com/users/1065020/dawn"
        >
          <i className="fab fa-stack-overflow" />
          StackOveflow
        </a>
      </li>
      <li className="twitter">
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/nshnt_sng"
        >
          <i className="fab fa-twitter" />
          Twitter
        </a>
      </li>
      <li className="linkedin">
        {' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/nishant-singh-b2420946"
        >
          <i className="fab fa-linkedin" />
          Linkedin
        </a>
      </li>
    </ul>
  </div>
);

export default SieBar;
