import React from 'react';
import { connect } from 'react-redux';

import PortfolioCard from './PortfolioCard';
import data from '../../../config/PortofolioData.json';

const shouldShowCard = (card, searchString) => {
  const searchKey = searchString.toLowerCase(),
    showByTag = card.tags.filter(t =>
      t.name.toLowerCase().startsWith(searchKey)
    ).length,
    showByDescriptoin =
      card.description.lead.toLowerCase().includes(searchKey) ||
      card.description.follow.toLowerCase().includes(searchKey),
    showByTitle = card.name.toLowerCase().includes(searchKey);

  return showByTag || showByDescriptoin || showByTitle;
};

class Portfolio extends React.PureComponent {
  state = { cards: [], lastSearchString: null };

  static getDerivedStateFromProps(
    {
      searchAndFilter: { searchString }
    },
    { lastSearchString }
  ) {
    return lastSearchString === searchString
      ? null
      : {
          searchString,
          cards: data.map(d => ({
            ...d,
            visible: shouldShowCard(d, searchString)
          }))
        };
  }

  render() {
    const { cards } = this.state;

    return (
      <div id="portfolio-page">
        <ul className="portfolio-deck">
          {cards.map(d =>
            d.visible ? (
              <li key={d.name}>
                <PortfolioCard data={d} />
              </li>
            ) : null
          )}
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
