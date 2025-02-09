import React from 'react'
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from '../API';
import { renderUpcomingCards } from './Cards.js';


export default function Upcoming() {
  const { upcomingMovies, upcomingSeries } = useApi();
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cat) {
      document.title = cat.toUpperCase();
      if(cat === "movies"){
        upcomingMovies()
        .then((data) => {
          setMovies(data.movies);
        })
        .catch((error) => {
          console.error("Failed to fetch Movies By Genre:", error);
          setMovies([]);
        })
        .finally(() => setLoading(false));
      }
      else {
        upcomingSeries()
        .then((data) => {
          setMovies(data.list);
        })
        .catch((error) => {
          console.error("Failed to fetch Movies By Genre:", error);
          setMovies([]);
        })
        .finally(() => setLoading(false));
      }
    }
  }, [cat]);
  
  useEffect(() => {
    if (!loading) {
      const cards = document.querySelectorAll(".up-card");
      cards.forEach((card) => card.classList.add("up-card2"));
    }
  }, [movies, loading]); 
  
  return (
    <div className="upcoming">
          <div className="container">
            <div className="upcoming-main-div" id="upcoming-movies">
              <p className="sec-p">Upcoming {cat.toUpperCase()}</p>
              {loading ? <div className="spinner spinner-upcoming-mov"></div> : <div className="ups-box" id="up-mas-box">{renderUpcomingCards(movies)}</div>}
            </div>
          </div>
      </div>
  );
}
