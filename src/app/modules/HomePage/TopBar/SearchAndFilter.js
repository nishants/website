import React from 'react';

class SearchAndFilter extends React.Component {
  setActive = () => this.props.setActive(true);

  setInActive = () => this.props.setActive(false);

  resetSearch = e => {
    e.preventDefault();
    this.props.search('');
    setTimeout(this.setInActive);
  };

  render() {
    const { setActive, setInActive, resetSearch } = this;
    const {
      searchAndFilter: { searchString, tags, active: activated },
      search
    } = this.props;

    return (
      <>
        <div
          className={`search-and-filter ${activated ? 'active' : ''}`}
          onClick={setActive}
          onMouseLeave={setInActive}
        >
          <div className="search-and-filter-input">
            <i className="search-icon fas fa-search" />
            <input
              placeholder="search"
              value={searchString}
              onBlur={setInActive}
              onChange={e => search(e.target.value)}
            />
          </div>
          <div className="search-and-filter-dropdown">
            <div>
              {tags.map(t => (
                <span key={t} className="tag-link" onClick={() => search(t)}>
                  #{t}
                </span>
              ))}
              {searchString && searchString.length && (
                <div onClick={resetSearch} className="clear-search-and-filter">
                  Clear Search
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SearchAndFilter;
