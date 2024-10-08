import React, { useEffect, useState } from 'react';
import './card2.css';
import { Link } from 'react-router-dom';

const API = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.freetogame.com/api/games?platform=pc')}`;

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
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const response = await fetch(API, { signal });
        const result = await response.json();
        const games = JSON.parse(result.contents);

        const top10Games = games.slice(0, 10);

        setData(top10Games);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data: ', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="slider-container">
      <h2 className="giveaways-heading">Free-PC-Games</h2>

      {loading ? (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="slider">
          <div className="slider-track">
            {data.map((game, index) => (
              <div className="card" key={index}>
                <img
                  src={game.thumbnail} 
                  alt={`Game ${index + 1}`}
                  className="card-image"
                />
                <h3 className="card-heading">{truncateText(game.title, 15)}</h3>
                <p className="card-paragraph">
                  {game.short_description || 'No description available'}
                </p>
              </div>
            ))}
            {data.map((game, index) => (
              <div className="card" key={index + 10}>
                <img
                  src={game.thumbnail} 
                  alt={`Game ${index + 1}`}
                  className="card-image"
                />
                <h3 className="card-heading">{truncateText(game.title, 15)}</h3>
                <p className="card-paragraph">
                  {game.short_description || 'No description available'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='news'>
        <Link to="/free">
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
