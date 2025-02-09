import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from '../API';
import { renderNewsCards } from './Cards.js'; 

export default function News() {
  const { getMovieNews, getCelebritiesNews } = useApi();
  const [searchParams] = useSearchParams();
  const newsParam = searchParams.get("news");
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMoviesNews, setLoadingMoviesNews] = useState(true); 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let data;
        if (newsParam === "movies") {
          data = await getMovieNews();
          document.title = "MOVIES NEWS";
        } else {
          data = await getCelebritiesNews();
          document.title = "CELEBRITIES NEWS";
        }
        setNewsData(data.news);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
        setLoadingMoviesNews(false); 
      }
    };

    fetchNews();
  }, [newsParam]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!newsData) {
    return <p>No news data available.</p>;
  }

  return (
    <div className="news">
      <div className="container">
        <div className="news-outBox">
          <p className="sec-p">{newsParam.toUpperCase()} News</p>
          {loadingMoviesNews ? (
            <div className="spinner spinner-news-mov"></div>
          ) : (
            <div className="newss">{renderNewsCards(newsData)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
