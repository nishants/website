import React from 'react';

const PortfolioCard = ({ data: { name, src, demo, tags } }) => (
  <div className="portfolio-card">
    <div className="portfolio-card-title">{name}</div>

    <div>
      {demo && (
        <a className="portfolio-card-demo" href={demo}>
          Demo
        </a>
      )}

      {src && (
        <a
          className="portfolio-card-src"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-link" />
          src
        </a>
      )}
    </div>

    {tags.map(t => (
      <span key={t.name}>#{t.name} </span>
    ))}
  </div>
);

export default PortfolioCard;
