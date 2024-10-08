import React, { useEffect, useState } from 'react';
import './new.css';

const News = () => {
  const [gamesData, setGamesData] = useState([]);
  const [visibleGames, setVisibleGames] = useState(10);
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(false);
  const [gamingNews, setGamingNews] = useState([]);
  const [newsOffset, setNewsOffset] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchResultCount, setSearchResultCount] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [initialDataLoad, setInitialDataLoad] = useState(true);  

  const giveawayAPI = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.gamerpower.com/api/giveaways')}`;
  const gamingNewsAPI = `https://api.allorigins.win/get?url=${encodeURIComponent('https://feeds.ign.com/ign/games-all')}`;

  const fetchGiveawayData = async () => {
    try {
      setLoading(true);
      const res = await fetch(giveawayAPI);
      const response = await res.json();
      const data = JSON.parse(response.contents);
      const filteredData = data.filter((game) => game.image && game.title && game.description);
      setGamesData(filteredData);
      setFilteredGames(filteredData); 
      setInitialLoad(false);
      setInitialDataLoad(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  const fetchGamingNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(gamingNewsAPI);
      const response = await res.json();
      const parser = new DOMParser();
      const rssDoc = parser.parseFromString(response.contents, "text/xml");
      const items = rssDoc.querySelectorAll("item");
      const newsData = Array.from(items).map((item) => ({
        title: item.querySelector("title")?.textContent || 'No Title',
        description: item.querySelector("description")?.textContent || '',
        link: item.querySelector("link")?.textContent || '#',
      }));
      setGamingNews(newsData);
      setInitialDataLoad(false); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = gamesData.filter(game =>
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
      );
      setFilteredGames(results);
      setSearchResultCount(results.length);
    } else {
      setFilteredGames(gamesData);
      setSearchResultCount(0);
    }
  };

  const loadMoreNews = () => {
    setNewsOffset((prevOffset) => prevOffset + 10);
  };

  const loadMoreGiveaways = () => {
    setVisibleGames((prevVisible) => prevVisible + 10);
  };

  useEffect(() => {
    fetchGiveawayData();
    fetchGamingNews();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.scrollHeight;
      if (nearBottom && !loading) {
        if (activeSection === 'games-info') {
          setLoading(true);
          loadMoreNews();
          setLoading(false);
        } else if (activeSection === 'home') {
          setLoading(true);
          loadMoreGiveaways();
          setLoading(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, loading]);

  const handleNavigationClick = (section) => {
    setActiveSection(section);
    if (section === 'home') {
      setVisibleGames(10);
      setLoading(true);
      fetchGiveawayData();
    } else if (section === 'games-info') {
      setLoading(true);
      fetchGamingNews();
    }
  };

  const handleReadMoreClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="body3">
        <nav className="sub-navbar3">
          <ul className="nav-list3">
            <li className="nav-item3" onClick={() => handleNavigationClick('home')}>
              Giveaways
            </li>
            <li className="nav-item3" onClick={() => handleNavigationClick('games-info')}>
              Gaming-News
            </li>
          </ul>
        </nav>

        <main>
          {activeSection === 'home' && (
            <div className="search-container3">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`search-input3 ${searchResultCount >= 2 && searchResultCount <= 3 ? 'search-input-highlight3' : ''}`}
              />
              {searchResultCount === 0 && searchQuery && (
                <div className="no-results3">No games found</div>
              )}
            </div>
          )}

          {activeSection === 'home' && (
            <div className="cards-container3">
              <div className="cards3">
                {loading && initialLoad && searchQuery.trim() === '' ? (
                  <div className="spinner-container3">
                    <div className="spinner3"></div>
                  </div>
                ) : (
                  filteredGames.length > 0 ? (
                    filteredGames.slice(0, visibleGames).map((game, index) => (
                      game.image && game.title && game.description ? (
                        <div className="card-container3" key={index}>
                          <div className="card3">
                            {game.image && (
                              <img src={game.image} alt={game.title} className="card-image3" />
                            )}
                            {game.title && <p className="card-subtitle3">{game.title}</p>}
                            {game.description && (
                              <p className="card-content3">{game.description.substring(0, 100)}...</p>
                            )}
                            <button
                              className="read-more-button3"
                              onClick={() => handleReadMoreClick(game.open_giveaway_url)}
                            >
                              Read More
                            </button>
                          </div>
                        </div>
                      ) : null
                    ))
                  ) : (
                    !initialLoad && !searchQuery && (
                      <div className="spinner-container3">
                        <div className="spinner3"></div>
                      </div>
                    )
                  )
                )}
              </div>
              {loading && !initialDataLoad && !searchQuery && (
                <div className="spinner-container3">
                  <div className="spinner3"></div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'games-info' && (
            <div className="gaming-news-container3">
              <h2 className='h2'>Gaming News</h2>
              <div className="news-list3">
                {loading && initialLoad ? (
                  <div className="spinner-container3">
                    <div className="spinner3"></div>
                  </div>
                ) : (
                  gamingNews.length > 0 ? (
                    gamingNews.slice(0, newsOffset).map((news, index) => (
                      (news.title && news.description) ? (
                        <div className="news-item3" key={index}>
                          {news.title && <h3 className="news-title3">{news.title}</h3>}
                          {news.description && (
                            <p className="news-description3">{news.description.substring(0, 150)}...</p>
                          )}
                          <button
                            className="read-more-button3"
                            onClick={() => handleReadMoreClick(news.link)}
                          >
                            Read More
                          </button>
                        </div>
                      ) : null
                    ))
                  ) : (
                    <div className="spinner-container3">
                      <div className="spinner3"></div>
                    </div>
                  )
                )}
              </div>
              {loading && !initialDataLoad && (
                <div className="spinner-container3">
                  <div className="spinner3"></div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default News;
