import React from 'react';
import Button from '../components/Button';

const PortfolioCard = ({
  data: { name, src, demo, tags, image, description, article, video },
  selectTag
}) => (
  <div className="portfolio-card">
    <div className="portfolio-card-title">{name}</div>
    {image && <img className="portfolio-card-image" src={image} alt={name} />}
    <p>
      <span className="portfolio-car-desc-lead">{description.lead}</span>{' '}
      {description.follow}
    </p>

    <div>
      {video && <Button href={video}>Watch Video</Button>}
      {article && <Button href={demo}>Read</Button>}

      {demo && <Button href={demo}>View Demo</Button>}

      {src && <Button href={src}>View Source Code</Button>}
    </div>

    <div className="tag-links">
      {tags.map(t => (
        <span
          className="tag-link"
          key={t.name}
          onClick={() => selectTag(t.name)}
        >
          #{t.name}{' '}
        </span>
      ))}
    </div>
  </div>
);

export default PortfolioCard;
