export const scrollToTop = () =>
  document
    .querySelector('#homepage .homepage-content .fixed-to-page .navigation')
    .scrollIntoView({ behavior: 'smooth' });

export const scrolledReached = (selector, offset = 0) => {
  const clientRect = document.querySelector(selector).getClientRects()[0],
    position =
      typeof clientRect.y === 'undefined' ? clientRect.top : clientRect.y;
  return position <= -offset;
};

export const getScrollPosition = () => window.pageYOffset;
