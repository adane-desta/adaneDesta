import React from 'react';
import PropTypes from 'prop-types';

import '/stylesheet_files/NewsPage.css';

const NewsItem = ({ image, alt, badge, title, description, date }) => {
  return (
    <div className="news-item with-image">
      <img src={image} alt={alt} />
      <div className="news-content">
        <div className="news-badge">{badge}</div>
        <h2>{title}</h2>
        <p>{description}</p>
        <span className="news-date">{date}</span>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  badge: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default NewsItem;
