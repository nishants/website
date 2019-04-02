import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioCard = ({
  data: { name, src, demo, tags, image, description }
}) => (
  <div className="portfolio-card">
    <div className="portfolio-card-title">{name}</div>
    {image && <img className="portfolio-card-image" src={image} alt={name} />}
    <p>
      {description.lead} {description.follow}
    </p>

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
      <Link to={`/portfolio?tags=${t.name}`} key={t.name}>
        #{t.name}{' '}
      </Link>
    ))}
  </div>
);

export default PortfolioCard;
