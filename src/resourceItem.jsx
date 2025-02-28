

import React from 'react';
import PropTypes from 'prop-types';

import '/stylesheet_files/resourcePage.css';


const ResourceItem = ({ image, alt, badge, title, description, date , actual_resourse_url}) => {
  return (
    <div className="resource-item with-image">
      <img src={image} alt={alt} />
      <div className="resource-content">
        <div className="resource-badge">{badge}</div>
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="resource-date">{date}</p>
        <a href={actual_resourse_url} className="btn" target='_blank'>Watch/Read</a>
      </div>
      
    </div>
  );
};

ResourceItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  badge: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  actual_resourse_url: PropTypes.string.isRequired
};

export default ResourceItem;