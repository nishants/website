import React from 'react';
import { connect } from 'react-redux';

import { searchForKey, setTags } from '../actions';
import { scrollToTop } from '../../../shared/util';

class SearchTab extends React.PureComponent {
  state = { cards: [], lastSearchString: null };

  static getDerivedStateFromProps(
    {
      data,
      shouldShowCard,
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
    const { data, dispatch } = this.props;
    const allTags = data
      .map(d => d.tags.reduce((all, tag) => all.concat(tag.name), []))
      .reduce((all, tags) => all.concat(tags), []);
    const uniqueTags = allTags.filter((tag, i) => allTags.indexOf(tag) === i);

    dispatch(setTags(uniqueTags));
  }

  selectTag = searchString => {
    this.props.dispatch(searchForKey(searchString));
    scrollToTop();
  };

  render() {
    const { cards } = this.state;
    const {
      CardComponent,
      searchAndFilter: { searchString }
    } = this.props;
    const { selectTag } = this;
    const noneVisible = !cards.find(c => c.visible);

    return (
      <>
        <ul className="search-tab-items">
          {cards.map(d =>
            d.visible ? (
              <li key={`${d.company}-${d.name}`}>
                <CardComponent data={d} selectTag={selectTag} />
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
      </>
    );
  }
}

const mapStateToProps = ({ home: { searchAndFilter } }) => ({
  searchAndFilter
});

export default connect(mapStateToProps)(SearchTab);
