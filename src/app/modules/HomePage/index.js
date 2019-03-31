import React from 'react';

import Splash from './Splash';
import ScrollListener from '../../shared/ScrollListener';

const scrolledReached = selector => document.querySelector(selector).getClientRects()[0].y < 1;


class HomePage extends React.PureComponent{

  state = {
    splashScrollState: 'one-sketch',
    homepageReached: false,
  };

  componentDidMount(){
    const onWindowScroll = ()=> {
      const homepageReached = scrolledReached("#homepage .homepage-content");
      let splashScrollState = 'four-fill';

      if(!homepageReached) {
        splashScrollState =
          scrolledReached("#homepage ul.splash-scroll-monitor > li:nth-child(4)") ? 'four-fill' :
            scrolledReached("#homepage ul.splash-scroll-monitor > li:nth-child(3)") ? 'three-expand':
              scrolledReached("#homepage ul.splash-scroll-monitor > li:nth-child(2)") ? 'two-begin'  :
                'one-sketch';
      }

      this.setState({homepageReached, splashScrollState})
    };
    this.scrollListener = ScrollListener.$window(onWindowScroll);
  }

  render(){
    const {splashScrollState} = this.state;
    return (
      <article id='homepage'>
        <section className='homepage-splash'>
          <Splash splashState={splashScrollState}/>
        </section>
        <section className='homepage-content-container'>
          <section className='homepage-splash-tint'>
            <ul className='splash-scroll-monitor'>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </section>
          <section className='homepage-content'>
            <h1>Welcome Nishant !
              {JSON.stringify(this.state)}
            </h1>
          </section>
        </section>
      </article>
    );
  }
}

export default HomePage;
