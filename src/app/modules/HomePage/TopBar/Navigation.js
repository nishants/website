import React from 'react';
import { Link } from 'react-router-dom';

import SearchAndFilter from './SearchAndFilter';
import ProfileImg from '../profile.jpg';

class Navigation extends React.PureComponent {
  render() {
    const { selectedLink, searchAndFilter, search } = this.props;
    return (
      <div className={`navigation ${selectedLink || ''}`}>
        <div className="profile-info">
          <img
            className="small-profile-image"
            alt="nishant singh"
            src={ProfileImg}
          />

          <div className="profile-labels">
            <label className="profile-name">Nishant Singh</label>
            <label className="profile-title">
              Designer | Craftsman | Consultant
            </label>
          </div>
        </div>
        <div className="navigation-links">
          <ul>
            <li className="portfolio-link">
              <Link to="/portfolio"> Portfolio </Link>
            </li>
            <li className="blog-link">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="work-history-link">
              <Link to="/work-history"> Work History </Link>
            </li>
            <li className="about-me-link">
              <Link to="/about-me"> About Me </Link>
            </li>
          </ul>
          {/* <div className="navigation-indicator" /> */}
          <SearchAndFilter searchAndFilter={searchAndFilter} search={search} />
        </div>
      </div>
    );
  }
}

export default Navigation;
