import React from 'react';
import { connect } from 'react-redux';

import PortfolioCard from './PortfolioCard';
import data from '../../../config/PortofolioData.json';

class Portfolio extends React.PureComponent {
  componentDidMount() {
    // console.log(this.props.searchAndFilter);
  }

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

const mapStateToProps = ({ home: { searchAndFilter } }) => ({
  searchAndFilter
});

export default connect(mapStateToProps)(Portfolio);
