import React from 'react';

import PortfolioCard from './PortfolioCard';
import data from '../../../config/PortofolioData.json';

class Portfolio extends React.PureComponent {
  componentDidMount() {}

  render() {
    return (
      <div id="portfolio-page">
        <ul className="portfolio-deck">
          {data.map(d => (
            <li key={d.name}>
              <PortfolioCard data={d} />
            </li>
          ))}
          ;
        </ul>
      </div>
    );
  }
}

export default Portfolio;
