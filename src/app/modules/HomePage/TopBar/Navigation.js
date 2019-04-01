import React from 'react';
import ProfileImg from '../profile.jpg';

class Navigation extends React.PureComponent {
  render() {
    const { selectedLink } = this.props;
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
            <li className="portfolio-link"> Portfolio</li>
            <li className="work-history-link"> Work History</li>
            <li className="about-me-link"> About Me </li>
          </ul>
          <div className="navigation-indicator" />
        </div>
      </div>
    );
  }
}

export default Navigation;
