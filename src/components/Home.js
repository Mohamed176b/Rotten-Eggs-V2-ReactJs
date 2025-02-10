import React, { useState, useEffect } from 'react';
import useApi from '../API';
import { MovieCard, renderUpcomingCards, renderNewsCards, BornTodayCard, BoxOfficeCard } from './Cards.js';
import { Link } from "react-router-dom";

const Home = () => {
  const { mostPopularMovies, getAvailableGenres, getMoviesByGenre, upcomingMovies, getTopBoxOffice, upcomingSeries, getTop250Movies, getBornToday, getMovieNews, getCelebritiesNews } = useApi();
  const [mostPopularMoviesresults, mostPopularMoviessetResults] = useState([]);
  const [getMoviesByGenreResults, getMoviesByGenresetResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("action");
  const [index, setIndex] = useState(0);
  const [upcomingMoviesResult, setUpcomingMovies] = useState([]);
  const [upcomingSeriesResult, setUpcomingSeries] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [movieNews, setMovieNews] = useState([]);
  const [celebrityNews, setCelebrityNews] = useState([]);
  const [loadingMoviesNews, setLoadingMoviesNews] = useState(true);
  const [loadingCelebritiesNews, setLoadingCelebritiesNews] = useState(true);
  const [bornToday, setBornToday] = useState([]);
  const [loadingBorn, setLoadingBorn] = useState(true);
  const [topMovies, setTopMovies] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);
  const [moviesTopBoxOffice, setMoviesTopBoxOffice] = useState([]);
  const [loadingTopBoxOffice, setLoadingTopBoxOffice] = useState(true);

  // Most pop movies
  useEffect(() => {
    const fetchMostPopularMovies = async () => {
      setLoading(true);
      try {
        const movieData = await mostPopularMovies();
        mostPopularMoviessetResults(movieData.movies || []);
      } catch (err) {
        console.error("Failed to fetch Most Popular Movies:", err);
        mostPopularMoviessetResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMostPopularMovies();
  }, []);

  // Geners
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAvailableGenres();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, []);

  // Movies by geners
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movieData = await getMoviesByGenre(selectedGenre);
        getMoviesByGenresetResults(movieData.movies || []);
      } catch (err) {
        console.error("Failed to fetch movies by genre:", err);
        getMoviesByGenresetResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedGenre]);

  // Trending Slider
  const trendingSliderData = mostPopularMoviesresults.slice(0, 8);
  useEffect(() => {
    if (trendingSliderData.length === 0) return;
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % trendingSliderData.length);
    }, 7000);
    return () => clearInterval(intervalId);
  }, [trendingSliderData.length]);
  const currentSlide = trendingSliderData[index] || {};
  const { title = "", image = "", link = "#", imdbRating = "N/A" } = currentSlide;

  // Fetch upcoming movies
  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const data = await upcomingMovies();
        setUpcomingMovies(data.movies.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch upcoming movies:", error);
      } finally {
        setLoadingMovies(false);
      }
    };
    fetchUpcomingMovies();
  }, []);

  // Fetch upcoming TV shows
  useEffect(() => {
    const fetchUpcomingSeries = async () => {
      try {
        const data = await upcomingSeries();
        setUpcomingSeries(data.list.slice(0, 3)); 
      } catch (error) {
        console.error("Failed to fetch upcoming TV shows:", error);
      } finally {
        setLoadingSeries(false);
      }
    };
    fetchUpcomingSeries();
  }, []);
  
  // Fetch movie news
  useEffect(() => {
    const fetchMovieNews = async () => {
      try {
        const data = await getMovieNews();
        setMovieNews(data.news.slice(0, 2)); 
      } catch (error) {
        console.error("Failed to fetch movie news:", error);
      } finally {
        setLoadingMoviesNews(false);
      }
    };
    fetchMovieNews();
  }, []);

  // Fetch celebrity news
  useEffect(() => {
    const fetchCelebrityNews = async () => {
      try {
        const data = await getCelebritiesNews();
        setCelebrityNews(data.news.slice(0, 2)); 
      } catch (error) {
        console.error("Failed to fetch celebrity news:", error);
      } finally {
        setLoadingCelebritiesNews(false);
      }
    };
    fetchCelebrityNews();
  }, []);

  // Fetch born today data
  useEffect(() => {
    const fetchBornToday = async () => {
      try {
        const data = await getBornToday();
          if (data?.list?.length) {
            setBornToday(data.list.slice(0, 5)); 
          } else {
            setBornToday([]); 
          }
      } catch (error) {
        console.error("Failed to fetch born today:", error);
      } finally {
        setLoadingBorn(false);
      }
    };
    fetchBornToday();
  }, []);

  // Top 250movies
  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const data = await getTop250Movies();
        if (data?.movies?.length) {
          setTopMovies(data.movies);
        } else {
          setTopMovies([]); 
        }
      } catch (error) {
        console.error("Failed to fetch top movies:", error);
        setTopMovies([]);
      } finally {
        setLoadingTop(false);
      }
    };
    fetchTopMovies();
  }, []);  

  // Top boxoffice
  useEffect(() => {
    const fetchBoxOfficeMovies = async () => {
      try {
        const data = await getTopBoxOffice();
        setMoviesTopBoxOffice(data.movies);
      } catch (error) {
        console.error("Failed to fetch top box office movies:", error);
      } finally {
        setLoadingTopBoxOffice(false);
      }
    };
    fetchBoxOfficeMovies();
  }, []);

  return (
    <div>
    <div className="slider" style={{ backgroundImage: `url('${image}')` }}>
      {loading && <div className="spinner"></div>}
      {!loading && (
        <div className="slider-desc-div">
          <h2 className="slider-Title">{title}</h2>
          <div className="rate-div">
            <i className="fa-brands fa-imdb"></i>
            <p className="slider-rate">{imdbRating}</p>
          </div>
          <a href={link} target="_blank" className="slider-link" rel="noopener noreferrer">
            Know More
          </a>
        </div>
      )}
    </div>
    <div className="gen">
      <div className="container">
        <p className="sec-p">Popular By Genre</p>
        <div className="gens" onWheel={(e) => {
          e.currentTarget.scrollBy({ left: e.deltaY, behavior: 'smooth' });
        }}>
          {genres.map((genre) => (
            <div key={genre} className={`gener ${selectedGenre === genre ? 'gener-active' : ''}`} data-var={genre} onClick={() => setSelectedGenre(genre)}>
              {genre.toUpperCase()}
            </div>
          ))}
        </div>
        {loading && <div className="spinner spinner-mov-gen"></div>}
        <div className="con-arrows">
          <div className="arrows arr-left" id="arr-left-gen" onClick={() => {
            document.querySelector('.gen-movies').scrollBy({ left: -300, behavior: 'smooth' });
          }}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="gen-movies">
            {getMoviesByGenreResults.map((movie) => (
              <MovieCard key={movie.title} movie={movie} />
            ))}
          </div>
          <div className="arrows arr-right" id="arr-right-gen" onClick={() => {
            document.querySelector('.gen-movies').scrollBy({ left: 300, behavior: 'smooth' });
          }}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div className="trends">
        <div className="container">
            <p className="sec-p">Trending Movies</p>
            {loading && <div className="spinner spinner-mov-trend"></div>}
            <div className="con-arrows">
              <div className="arrows arr-left" id="arr-left-gen" onClick={() => {
                document.querySelector('.trend-movies').scrollBy({ left: -300, behavior: 'smooth' });
              }}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
              <div className="trend-movies">
              {mostPopularMoviesresults.map((movie) => (
                <MovieCard key={movie.title} movie={movie} />
              ))}
              </div>
              <div className="arrows arr-right" id="arr-right-gen" onClick={() => {
                document.querySelector('.trend-movies').scrollBy({ left: 300, behavior: 'smooth' });
              }}>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
        </div>
    </div>
    <div className="upcoming">
      <div className="container">
        {/* Upcoming Movies */}
        <div className="upcoming-main-div">
          <Link to="/upcoming?cat=movies" className="up-t-i">
            <p className="sec-p">Upcoming Movies</p>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
          {loadingMovies ? <div className="spinner spinner-upcoming-mov"></div> : <div className="ups-box">{renderUpcomingCards(upcomingMoviesResult)}</div>}
        </div>

        {/* Upcoming TV Shows */}
        <div className="upcoming-main-div tv-spec">
          <Link to="/upcoming?cat=tvshows" className="up-t-i">
            <p className="sec-p">Upcoming TV Shows</p>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
          {loadingSeries ? <div className="spinner spinner-upcoming-ser"></div> : <div className="ups-box">{renderUpcomingCards(upcomingSeriesResult)}</div>}
        </div>
      </div>
    </div>
    <div className="news">
      <div className="container">
        {/* Movie News */}
        <div className="news-outBox">
          <Link to="/news?news=movies" className="up-t-i">
            <p className="sec-p">Movies News</p>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
          {loadingMoviesNews ? <div className="spinner spinner-news-mov"></div> : <div className="newss">{renderNewsCards(movieNews)}</div>}
        </div>

        {/* Celebrity News */}
        <div className="news-outBox">
          <Link to="/news?news=celebrities" className="up-t-i">
            <p className="sec-p">Celebrities News</p>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
          {loadingCelebritiesNews ? <div className="spinner spinner-news-cel"></div> : <div className="newss">{renderNewsCards(celebrityNews)}</div>}
        </div>
      </div>
    </div>
    <div className="born">
      <div className="container">
        <Link to="/born" className="up-t-i">
          <p className="sec-p">Born Today</p>
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
        
        {loadingBorn ? (
          <div className="spinner spinner-born"></div>
        ) : (
          <div className="acts-born">
            {bornToday.map((act) => (
              <BornTodayCard key={act.name} act={act} />
            ))}
          </div>
        )}
      </div>
    </div>
    <div className="trends">
      <div className="container">
        <p className="sec-p">Top 250 Movies</p>
        {loadingTop ? (
          <div className="spinner spinner-mov-top"></div>
        ) : (
          <div className="con-arrows">
            <div className="arrows arr-left" id="arr-left-gen" onClick={() => {
                document.querySelector('.top-movies').scrollBy({ left: -300, behavior: 'smooth' });
              }}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            <div className="top-movies">
              {topMovies.length > 0 ? (
                topMovies.map((movie, index) => (
                  <MovieCard key={index} movie={movie} index={index + 1} />
                ))
              ) : (
                <p>No movies available</p>
              )}
            </div>
            <div className="arrows arr-right" id="arr-right-gen" onClick={() => {
                document.querySelector('.top-movies').scrollBy({ left: 300, behavior: 'smooth' });
              }}>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
          </div>
        )}
      </div>
    </div>
    <div className="boxOffice">
      <div className="container">
        <div id="upcoming-movies" className="upcoming-main-div">
          <p className="sec-p">Top Box Office</p>
          {loadingTopBoxOffice ? (
            <div className="spinner spinner-boxOffice"></div>
          ) : (
            <div id="boxOffice" className="ups-box">
              {moviesTopBoxOffice.map((movie, index) => (
                <BoxOfficeCard key={index} movie={movie} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;