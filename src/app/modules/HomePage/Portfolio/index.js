import React from 'react';
import { connect } from 'react-redux';

import PortfolioCard from './PortfolioCard';
import data from '../../../config/PortofolioData.json';
import { searchForKey, setTags } from '../actions';
import { scrollToTop } from '../../../shared/util';

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

  componentDidMount() {
    const allTags = data
      .map(d => d.tags.reduce((all, tag) => all.concat(tag.name), []))
      .reduce((all, tags) => all.concat(tags), []);
    this.props.dispatch(
      setTags(allTags.filter((tag, i) => allTags.indexOf(tag) === i))
    );
  }

  selectTag = searchString => {
    this.props.dispatch(searchForKey(searchString));
    scrollToTop();
  };

  render() {
    const { cards } = this.state;
    const {
      searchAndFilter: { searchString }
    } = this.props;
    const { selectTag } = this;
    const noneVisible = !cards.find(c => c.visible);

    return (
      <div id="portfolio-page">
        <ul className="portfolio-deck">
          {cards.map(d =>
            d.visible ? (
              <li key={d.name}>
                <PortfolioCard data={d} selectTag={selectTag} />
              </li>
            ) : null
          )}
        </ul>
        {noneVisible && (
          <span className="no-results-message">
            {' '}
            No results for {`"${searchString}"`}{' '}
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ home: { searchAndFilter } }) => ({
  searchAndFilter
});

export default connect(mapStateToProps)(Portfolio);
