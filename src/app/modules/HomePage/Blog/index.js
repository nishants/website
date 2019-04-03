import React from 'react';

import SearchTab from '../SearchTab';

import PortfolioCard from '../Portfolio/PortfolioCard';
import data from '../../../config/PortofolioData.json';

const shouldShowCard = (card, searchString) => {
  const searchKey = searchString.toLowerCase(),
    showByTag = card.tags.filter(t =>
      t.name.toLowerCase().startsWith(searchKey)
    ).length,
    showByDescriptoin =
      card.description.lead.toLowerCase().includes(searchKey) ||
      card.description.follow.toLowerCase().includes(searchKey),
    showByTitle = card.name.toLowerCase().includes(searchKey);

  return showByTag || showByDescriptoin || showByTitle;
};

const Blog = () => (
  <div id="blog-page">
    <SearchTab
      data={data}
      CardComponent={PortfolioCard}
      shouldShowCard={shouldShowCard}
    />
  </div>
);

export default Blog;
