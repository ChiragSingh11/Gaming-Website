import React, { useEffect, useState } from 'react';
import './card.css';
import { Link } from 'react-router-dom';

const API = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.gamerpower.com/api/giveaways')}`;

// Function to truncate text to a specified length with ellipsis
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const CardSlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const { signal } = controller; // Get the signal

    const fetchData = async () => {
      try {
        const response = await fetch(API, { signal });
        const result = await response.json();
        const giveaways = JSON.parse(result.contents);

        // Display only the top 10 items
        const top10Giveaways = giveaways.slice(0, 10);

        setData(top10Giveaways);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching data: ", error);
        }
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();

    // Cleanup function to abort the fetch request if the component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="slider-container">
      {/* Added heading */}
      <h2 className="giveaways-heading">Give-Aways</h2>

      {loading ? (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="slider">
          <div className="slider-track">
            {/* Render top 10 cards */}
            {data.map((giveaway, index) => (
              <div className="card" key={index}>
                <img
                  src={giveaway.image} // Replace with appropriate image URL
                  alt={`Giveaway ${index + 1}`}
                  className="card-image"
                />
                <h3 className="card-heading">{truncateText(giveaway.title, 15)}</h3>
                <p className="card-paragraph">
                  {giveaway.description || 'No description available'}
                </p>
              </div>
            ))}
            {/* Repeat the cards for seamless scrolling effect */}
            {data.map((giveaway, index) => (
              <div className="card" key={index + 10}>
                <img
                  src={giveaway.image} // Replace with appropriate image URL
                  alt={`Giveaway ${index + 1}`}
                  className="card-image"
                />
                <h3 className="card-heading">{truncateText(giveaway.title, 15)}</h3>
                <p className="card-paragraph">
                  {giveaway.description || 'No description available'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='news'>
        <Link to="/news">
          <button className='button'>
            R E A D   M O R E
            <div id="clip">
              <div id="leftTop" className="corner"></div>
              <div id="rightBottom" className="corner"></div>
              <div id="rightTop" className="corner"></div>
              <div id="leftBottom" className="corner"></div>
            </div>
            <span id="rightArrow" className="arrow"></span>
            <span id="leftArrow" className="arrow"></span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardSlider;
