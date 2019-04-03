import React from 'react';

class SearchAndFilter extends React.Component {
  state = { activated: false };

  setActive = () => this.setState({ activated: true });

  setInActive = () => this.setState({ activated: false });

  render() {
    const { activated } = this.state;
    const { setActive, setInActive } = this;
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SearchAndFilter;
