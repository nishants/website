export const scrollToTop = () =>
  document
    .querySelector('#homepage .homepage-content .fixed-to-page .navigation')
    .scrollIntoView({ behavior: 'smooth' });

export const scrolledReached = (selector, offset = 0) =>
  document.querySelector(selector).getClientRects()[0].y <= -offset;

export const getScrollPosition = () => window.pageYOffset;
