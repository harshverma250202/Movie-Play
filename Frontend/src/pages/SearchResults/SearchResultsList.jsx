import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { Link } from 'react-router-dom';

import './SearchResultsList.css'

export const ResultPage = () => {
  const location = useLocation();

  const { data, query } = location.state;

  const handleImageError = (event) => {
    event.target.src = 'https://via.placeholder.com/150';
  }

  return (
    <div className="results-container">
      <div className='results-title'><h1>Results for <span>"{query}"</span></h1></div>
      <div className="results-list">
        {data && data.map((result) => (
          <div className='results-element' key={result._id}>
            <Link to={`/player/${result._id}`}>
              <div style={{backgroundColor: `${
                result.subscriptionType === 'Free' ? '#006400' :
                result.subscriptionType === 'Premium' ? '#371F76' : '#880000'
              }`}} className='results-sub-type'>
                  {`${result.subscriptionType}`}
              </div>
              <img onError={handleImageError} className='results-poster' src={`${result.poster}`} alt={result.title} />
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};
