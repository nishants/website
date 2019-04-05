import React from 'react';

const creatGridItem = e => ({
  _e: e,
  getHeight: () => e.offsetHeight,
  getWidth: () => e.offsetWidth,
  setWidth: value => {
    e.style.width = `${value}px`;
  },
  reset: () => {
    e.style.transform = `translateX(-${e.offsetLeft}px) translateY(-${
      e.offsetTop
    }px)`;
    console.log('resetting item ', e);
  },
  setPosition: (top, left) => {
    e.style.transform = `translateX(${left}px) translateY(${top}px)`;
  },
  hasClass: name => e.classList.contains(name),
  hide: () => {
    e.style.transform = `translateY(100vh)`;
    e.style.opacity = `0`;
  }
});

const itemInitialStyle = { position: 'absolute', top: 0, left: 0, opacity: 0 };

const isPercentage = value =>
  typeof value === 'string' && !!value.match(/^[\d]*%$/);

const percentOf = (percent, value) =>
  Math.floor((parseFloat(percent.split('%')[0]) * value) / 100);
const valueAsPixel = ({ widthValue, containerWidth }) =>
  isPercentage(widthValue) ? percentOf(widthValue, containerWidth) : widthValue;

const getNaturalWidth = ({ widthValue, containerWidth, firstElement }) => {
  return !widthValue
    ? (firstElement ? firstElement.offsetWidth : 0)
    : valueAsPixel({ widthValue, containerWidth });
};

const computeLayout = ({
  container,
  items,
  sortBy,
  layout = { maxWidth: 0, width: 0 }
}) => {
  const positions = [];
  const containerWidth = container.offsetWidth;

  const naturalWidth = getNaturalWidth({
    widthValue: layout.width || '100%',
    containerWidth,
    firstElement: items[items.length - 1]._e.firstElementChild
  });

  const maxWidth = valueAsPixel({
    widthValue: layout.maxWidth || '100%',
    containerWidth
  });
  const voidWidth = containerWidth % naturalWidth;
  const rowsCount = Math.floor(containerWidth / naturalWidth);
  const suggesstedWidth = naturalWidth + voidWidth / rowsCount;
  const actualWidth =
    rowsCount === 0
      ? containerWidth
      : suggesstedWidth > maxWidth
      ? maxWidth
      : suggesstedWidth;

  console.log({
    actualWidth,
    rowsCount,
    suggesstedWidth,
    voidWidth,
    maxWidth,
    naturalWidth,
    containerWidth
  });

  const lastYPositions = [];
  const sortedItems = items.sort(sortBy);

  for (let i = 0; i < rowsCount; i++) lastYPositions.push(0);

  const getNextRow = () => {
    let nextRow = 0;
    for (let i = 0; i < lastYPositions.length; i++) {
      if (lastYPositions[i] < lastYPositions[nextRow]) {
        nextRow = i;
      }
    }
    return nextRow;
  };

  for (let i = 0; i < sortedItems.length; i++) {
    const row = getNextRow();
    const left = row * actualWidth;
    const top = lastYPositions[row];
    const item = sortedItems[i];
    if (!item.hasClass('visible')) {
      item.hide();
      continue;
    }
    positions.push({ item, left, top });

    lastYPositions[row] = lastYPositions[row] + item.getHeight();
  }

  return {
    positions,
    rowWidth: actualWidth,
    containerHeight: Math.max.apply(null, lastYPositions)
  };
};

class VerticalDeck extends React.PureComponent {
  gridId = Math.random().toString();

  state = { gridItems: [], ready: false };

  listener = null;

  gridElement = React.createRef();

  domObserver = null;

  componentDidMount() {
    this.domObserver = new MutationObserver(this.updateLayout);
    window.addEventListener('resize', this.updateLayout);

    this.domObserver.observe(this.gridElement.current, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    });
    setTimeout(() => this.setState({ ready: true }), 1500);
  }

  componentWillUnmount() {
    this.domObserver.disconnect();
    window.removeEventListener('resize', this.updateLayout);
  }

  updateLayout = e => {
    const computedLayout = computeLayout({
      container: this.gridElement.current,
      items: this.state.gridItems,
      sortBy: this.props.sortBy,
      layout: this.props.layout
    });

    this.gridElement.current.style.height = `${
      computedLayout.containerHeight
    }px`;
    window.computedLayout = computedLayout;

    computedLayout.positions.forEach(p => {
      p.item.setPosition(p.top, p.left);
      p.item._e.style.opacity = 1;
      p.item.setWidth(computedLayout.rowWidth);
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
    const { ready } = this.state;
    const { gridId, addItemRef, gridElement } = this;

    return (
      <ul
        ref={gridElement}
        className={`search-tab-items ${ready ? 'ready-now' : ''}`}
        style={{ position: 'relative' }}
      >
        {items.map(Item => (
          <li
            className={`${Item.visible ? 'visible' : ''}`}
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
