import React, { useEffect, useState } from 'react';
import './top-release.css';

const Top = () => {
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = `https://api.rawg.io/api/games?key=7ba5ae2d4dc64b16a5857934a61a2bbc&page_size=50`;

  const fetchApiData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);


      const filteredData = data.results.filter(game => {
        if (!game.background_image || !game.name || !game.released || !game.slug) {
          return false;
        }
        return true;
      });

      setGamesData(filteredData);
      setLoading(false); 
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchApiData(API);
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      <div className="body">
        <main>
          <div className="cards-container">
            <div className="cards">
              {loading ? (
                <div className="top-spinner"></div> 
              ) : (
                gamesData.map((game, index) => (
                  <div className="card-container1" key={index}>
                    <div className="card1">
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="card-image1"
                      />
                      <p className="card-subtitle1">{game.name}</p>
                      <p className="card-content1">
                        {truncateText(`Released: ${game.released}`, 200)}
                      </p>
                      <button className="card-button1">
                        <a href={`https://rawg.io/games/${game.slug}`} target="_blank" rel="noopener noreferrer">Learn More</a>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Top;
