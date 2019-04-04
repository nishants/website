import React from 'react';

const creatGridItem = e => ({
  _e: e,
  getHeight: () => e.offsetHeight,
  reset: () => {
    e.style.transform = `translateX(-${e.offsetLeft}px) translateY(-${
      e.offsetTop
    }px)`;
    console.log('resetting item ', e);
  },
  setPosition: (top, left) => {
    e.style.transform = `translateX(${left}px) translateY(${top}px)`;
  }
});

const itemInitialStyle = { position: 'absolute', top: 0, left: 0, opacity: 0 };

const computeLayout = ({
  container,
  items,
  sortBy,
  itemBottomMargin = 10,
  itemRightMargin = 10
}) => {
  const positions = [];
  const rowWidth = 270;
  const totalRows = Math.floor(
    container.offsetWidth / (rowWidth + itemRightMargin)
  );

  let  lastYPositions = [];
  const sortedItems = items.sort(sortBy);

  for (let i = 0; i < totalRows; i++) lastYPositions.push(0);

  const getNextRow = () => {
    let nextRow = 0;
    for (let i = 0; i < lastYPositions.length; i++) {
      if(lastYPositions[i] < lastYPositions[nextRow]){
        nextRow = i;
      }
    }
    return nextRow;
  };

  for (let i = 0; i < sortedItems.length; i++) {
    const row = getNextRow();
    const left = row * rowWidth + row * itemRightMargin;
    const top = lastYPositions[row];
    const item = sortedItems[i];

    positions.push({ item, left, top });

    lastYPositions[row] =
      lastYPositions[row] + item.getHeight() + itemBottomMargin;
    row = row === totalRows - 1 ? 0 : (row + 1) % totalRows;
  }

  return {
    positions,
    containerHeight: Math.max.apply(null, lastYPositions) + itemBottomMargin
  };
};

class VerticalDeck extends React.PureComponent {
  gridId = Math.random().toString();

  state = { gridItems: [] };

  listener = null;

  gridElement = React.createRef();

  componentDidMount() {
    setTimeout(this.updateLayout, 1500);
    this.listener = this.gridElement.current.addEventListener(
      'DOMSubtreeModified',
      this.updateLayout
    );
  }

  componentWillUnmount() {}

  updateLayout = e => {
    const layout = computeLayout({
      container: this.gridElement.current,
      items: this.state.gridItems,
      sortBy: this.props.sortBy
    });

    window.iLayout = layout;
    window.gridElement = this.gridElement;
    this.gridElement.current.style.height = `${layout.containerHeight}px`;
    layout.positions.forEach(p => {
      p.item.setPosition(p.top, p.left);
      p.item._e.style.opacity = 1;
    });
  };

  addItemRef = item => {
    const gridItem = creatGridItem(item);
    this.setState(state => ({
      ...state,
      gridItems: state.gridItems.concat(gridItem)
    }));
  };

  render() {
    const { items } = this.props;
    const { gridId, addItemRef, gridElement } = this;

    return (
      <ul
        ref={gridElement}
        className="search-tab-items"
        style={{ position: 'relative' }}
      >
        {items.map(Item => (
          <li
            style={itemInitialStyle}
            id={`${gridId}-${Item.id}`}
            ref={addItemRef}
            key={Item.id}
          >
            {Item.Component}
          </li>
        ))}
      </ul>
    );
  }
}

export default VerticalDeck;
