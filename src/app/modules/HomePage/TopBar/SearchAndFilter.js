import React from 'react';

class SearchAndFilter extends React.Component {
  state = { activated: false };

  setActive = () => this.setState({ activated: true });

  setInActive = () => this.setState({ activated: false });

  resetSearch = e => {
    e.preventDefault();
    this.props.search('');
    setTimeout(this.setInActive);
  };

  render() {
    const { activated } = this.state;
    const { setActive, setInActive, resetSearch } = this;
    const {
      searchAndFilter: { searchString, tags },
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
