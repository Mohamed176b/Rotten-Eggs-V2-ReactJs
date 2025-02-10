import React from 'react'
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from '../API';

export default function ByCat() {
  const { getMoviesByGenre } = useApi();
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cat) {
      document.title = cat.toUpperCase();
      
      getMoviesByGenre(cat)
        .then((data) => {
          setMovies(data.movies ?? data.list);
        })
        .catch((error) => {
          console.error("Failed to fetch Movies By Genre:", error);
          setMovies([]);
        })
        .finally(() => setLoading(false));
    }
  }, [cat]);
  

  return (
    <div className="upcoming">
      <div className="container">
        <div id="upcoming-movies" className="upcoming-main-div">
          <p className="sec-p">{cat ? cat.toUpperCase() : "Upcoming"}</p>
          {loading ? (
            <div className="spinner spinner-bycat"></div>
          ) : (
            <div id="up-mas-box" className="ups-box cat-box">
              {movies.map((movie, index) => (
                <a
                  key={index}
                  href={`/picked?movie=${encodeURIComponent(
                    JSON.stringify(movie)
                  )}`}
                  className="up-card up-card2"
                >
                  <img
                    className="up-img"
                    alt={movie.title}
                    src={movie.image}
                  />
                  <div>
                    <h5 className="up-h">{movie.title}</h5>
                    <p className="up-p">{movie.imdbRating}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
