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
          <input
            placeholder="search"
            value={searchString}
            onChange={e => search(e.target.value)}
          />
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
