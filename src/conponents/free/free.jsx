import React, { useEffect, useState } from 'react';
import './free.css';

const Free = () => {
  const [gamesData, setGamesData] = useState({ home: [], pc: [], shooting: [] });
  const [visibleGames, setVisibleGames] = useState(10);
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(false); 
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const baseURL = 'https://www.freetogame.com/api/games';
  const pcURL = `${baseURL}?platform=pc`;
  const shootingURL = `${baseURL}?category=shooter`;

  const fetchApiData = async (section) => {
    let url = '';
    if (section === 'pc') url = pcURL;
    else if (section === 'shooting') url = shootingURL;
    else url = baseURL;

    if (gamesData[section].length > 0) return;

    try {
      setLoading(true); 
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const response = await res.json();
      const data = JSON.parse(response.contents);

      const filteredData = data.filter((game) => game.thumbnail && game.title && game.short_description);

      setGamesData((prevData) => ({
        ...prevData,
        [section]: filteredData,
      }));

      setLoading(false);
      setIsInitialLoad(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData('home');
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading) {
      loadMoreGames();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const loadMoreGames = () => {
    if (searchQuery.trim() === '') {
      setLoading(true);
      setTimeout(() => {
        setVisibleGames((prevVisibleGames) => prevVisibleGames + 10);
        setLoading(false);
      }, 500);
    }
  };

  const handleNavigationClick = (section) => {
    setActiveSection(section);
    setVisibleGames(10);
    setLoading(true);
    fetchApiData(section);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGames = gamesData[activeSection].filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="body4">
        <nav className="sub-navbar4">
          <ul className="nav-list4">
            <li className="nav-item4" onClick={() => handleNavigationClick('home')}>Home</li>
            <li className="nav-item4" onClick={() => handleNavigationClick('pc')}>PC</li>
            <li className="nav-item4" onClick={() => handleNavigationClick('shooting')}>Shooting</li>
          </ul>
        </nav>

        <main>
          <div className="search-container4">
            <input
              type="text"
              className="search-input4"
              placeholder="Search games..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="cards-container4">
            <div className="cards4">
              {loading && isInitialLoad && searchQuery.trim() === '' ? (
                <div className="spinner-container4">
                  <div className="spinner4"></div>
                </div>
              ) : (
                filteredGames.length > 0 ? (
                  filteredGames.slice(0, visibleGames).map((game, index) => (
                    <div className="card-container4" key={index}>
                      <div className="card4">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="card-image4"
                        />
                        <p className="card-subtitle4">{game.title}</p>
                        <p className="card-content4">{truncateText(game.short_description, 100)}</p>
                        
                        <div className="card-footer4">
                          <button className="card-button4">
                            <a href={game.game_url} target="_blank" rel="noopener noreferrer">Read More</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  searchQuery.trim() !== '' && <p className="load4">No games found</p>
                )
              )}
            </div>

            {loading && !isInitialLoad && searchQuery.trim() === '' && (
              <div className="load-more-container4">
                <div className="spinner-container4">
                  <div className="spinner4"></div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Free;
