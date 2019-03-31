import React from 'react';

const scrolledReached = selector => document.querySelector(selector).getClientRects()[0].y < 1;

class HomePage extends React.PureComponent{

  state = {
    splashScrollState: 'one',
    homepageReached: false,
  };

  componentDidMount(){
    window.addEventListener('scroll', ()=> {
      const homepageReached = scrolledReached("#homepage .homepage-content");
      let splashScrollState = 'four';

      if(!homepageReached) {
          splashScrollState =
            scrolledReached("#homepage ul.splash-scroll-monitor > li:nth-child(4)") ? 'four' :
            scrolledReached("#homepage ul.splash-scroll-monitor > li:nth-child(3)") ? 'three':
            scrolledReached("#homepage ul.splash-scroll-monitor > li:nth-child(2)") ? 'two'  :
            'one';
      }

      this.setState({homepageReached, splashScrollState})
    });
  }

  render(){
    return (
      <article id='homepage'>
        <section className='homepage-splash'>
          <h1>Spash splash</h1>
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
