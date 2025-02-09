import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from "../API";

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { searchMovie } = useApi();
  const debounceRef = useRef(null);
  const query = searchParams.get("search");

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current); 
    }
    
    debounceRef.current = setTimeout(() => {
      if (query) {
        fetchMovies(query);
      }
    }, 500); 

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [query]);

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const movieData = await searchMovie(query);
      if (movieData && movieData.d) {
        setResults(movieData.d);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Failed to fetch movie:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-result">
      <div className="container">
          <div class="search-div">
            <p className="search-p">Search results for: <span>{query}</span></p>
          </div>
            {loading && <div className="spinner"></div>}
            <div className="results">
              {
                results.map((movie, index) => {
                  if (movie) {
                    const { imageUrl } = movie.i || {};
                    const {l,q,s,y} = movie;
                    return (
                      <div key={index} className="movie-result">
                        <img src={imageUrl || "../imgs/tvShowAlt.jpg"} alt={l || ""} loading="lazy" />
                        <div className="result">
                          <h4 className="mTitle">{l || ""}</h4>
                          <div className="m-des-div2">
                            <p>{y || ""}</p>
                            <p>{q || ""}</p>
                          </div>
                          <p>{s || ""}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })
              }
            </div>
      </div>
    </div>
    
  );
};

export default Search;
