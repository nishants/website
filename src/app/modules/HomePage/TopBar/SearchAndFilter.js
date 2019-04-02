import React from 'react';

class SearchAndFilter extends React.Component {
  state = { activated: false };

  setActive = () => this.setState({ activated: true });

  setInActive = () => this.setState({ activated: false });

  render() {
    const { activated } = this.state;
    const { setActive, setInActive } = this;

    return (
      <>
        <div
          className={`search-and-filter ${activated ? 'active' : ''}`}
          onClick={setActive}
          onMouseLeave={setInActive}
        >
          <input placeholder="search" />
          <div className="search-and-filter-dropdown">
            <div>
              {' '}
              #java, #javascript #ruby #test #ci {JSON.stringify(activated)}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SearchAndFilter;
