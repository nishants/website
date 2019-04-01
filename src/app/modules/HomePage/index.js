import React from 'react';

import Splash from './Splash';
import ScrollListener from '../../shared/ScrollListener';
import ProfileImg from './profile.jpg';
import Navigation from './TopBar/Navigation';

const scrolledReached = (selector, offset = 0) =>
  document.querySelector(selector).getClientRects()[0].y < -offset;

class HomePage extends React.PureComponent {
  state = {
    splashScrollState: '',
    profileReached: false,
    stickNavigation: false,
    selectedNavigationLink: 'portfolio'
  };

  componentDidMount() {
    const onWindowScroll = () => {
      const profileReached = scrolledReached(
        '#homepage .homepage-content .fixed-to-page .profile',
        40
      );
      const stickNavigation = scrolledReached(
        '#homepage .homepage-content .fixed-to-page .navigation'
      );

      let splashScrollState = '';

      if (!profileReached) {
        splashScrollState = scrolledReached(
          '#homepage ul.splash-scroll-monitor > li:nth-child(4)'
        )
          ? 'four'
          : scrolledReached(
              '#homepage ul.splash-scroll-monitor > li:nth-child(3)'
            )
          ? 'three'
          : scrolledReached(
              '#homepage ul.splash-scroll-monitor > li:nth-child(2)'
            )
          ? 'two'
          : scrolledReached(
              '#homepage ul.splash-scroll-monitor > li:nth-child(1)',
              5
            )
          ? 'one'
          : '';
      }

      this.setState({ profileReached, splashScrollState, stickNavigation });
    };
    this.scrollListener = ScrollListener.$window(onWindowScroll);
  }

  render() {
    const {
      splashScrollState,
      profileReached,
      stickNavigation,
      selectedNavigationLink
    } = this.state;
    return (
      <article
        id="homepage"
        className={`${profileReached ? 'profile-reached' : ''} ${
          stickNavigation ? 'stick-navigation' : ''
        }`}
      >
        <section className="homepage-splash">
          <Splash splashState={splashScrollState} />
        </section>
        <section className="homepage-content-container">
          <section className="homepage-splash-tint">
            <ul className="splash-scroll-monitor">
              <li />
              <li />
              <li />
              <li />
            </ul>
          </section>
          <section className="homepage-content">
            <div id="top-bar">
              <div className="profile-bar fixed-to-page">
                <div className="profile">
                  <div className="slope-bg" />
                  <div className="profile-image-container">
                    <img src={ProfileImg} alt="Nishant Singh" />
                  </div>
                </div>
                <Navigation selectedLink={selectedNavigationLink} />
              </div>
              <div className="fixed-to-window">
                <Navigation selectedLink={selectedNavigationLink} />
              </div>
            </div>
            <h1>Welcome Nishant !</h1>
          </section>
        </section>
      </article>
    );
  }
}

export default HomePage;
