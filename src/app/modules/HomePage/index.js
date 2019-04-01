import React from 'react';

import Splash from './Splash';
import ScrollListener from '../../shared/ScrollListener';
import ProfileImg from './profile.jpg';

const scrolledReached = (selector, offset = 0) =>
  document.querySelector(selector).getClientRects()[0].y < -offset;

class HomePage extends React.PureComponent {
  state = {
    splashScrollState: '',
    homepageReached: false,
    stickNavigation: false
  };

  componentDidMount() {
    const onWindowScroll = () => {
      const homepageReached = scrolledReached(
        '#homepage .homepage-content .fixed-to-page .profile'
      );
      const stickNavigation = scrolledReached(
        '#homepage .homepage-content .fixed-to-page .navigation'
      );

      let splashScrollState = '';

      if (!homepageReached) {
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

      this.setState({ homepageReached, splashScrollState, stickNavigation });
    };
    this.scrollListener = ScrollListener.$window(onWindowScroll);
  }

  render() {
    const { splashScrollState, homepageReached, stickNavigation } = this.state;
    const Navigation = (
      <div className="navigation">
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
      </div>
    );

    return (
      <article
        id="homepage"
        className={`${homepageReached ? 'profile-reached' : ''} ${
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
                {Navigation}
              </div>
              <div className="fixed-to-window">{Navigation}</div>
            </div>
            <h1>Welcome Nishant !</h1>
          </section>
        </section>
      </article>
    );
  }
}

export default HomePage;
