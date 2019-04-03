import React from 'react';

const WorkHistoryCard = ({
  data: {
    position,
    company,
    image,
    fromDate,
    toDate,
    location,
    description,
    tags
  },
  selectTag
}) => (
  <div className="work-history-card">
    <div className="work-history-card-title">{position}</div>
    <label>{company}</label>
    {image && (
      <img className="work-history-card-image" src={image} alt={position} />
    )}
    <p>{company}</p>

    <label>
      {fromDate} - {toDate}
    </label>
    <label>{location}</label>
    <p>{description}</p>

    <ul className="tag-links">
      {tags.map(t => (
        <li key={t.name} onClick={() => selectTag(t.name)}>
          #{t.name}{' '}
        </li>
      ))}
    </ul>
  </div>
);

export default WorkHistoryCard;
