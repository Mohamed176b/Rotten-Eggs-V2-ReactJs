import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function DetailsPage() {
  const [searchParams] = useSearchParams();
  const movieDataParam = searchParams.get("movie") || searchParams.get("up");
  const movieDate = searchParams.get("date");
  const actDataParam = searchParams.get("act");
  const newsParam = searchParams.get("news");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isActor = !!actDataParam;

  // useEffect(() => {
  //   if (movieDataParam === "up" && !loading) {
  //     let categoriesDiv = document.querySelector(".categories");
  //     categoriesDiv.innerHTML = "";
  //     data.categories.forEach(category => {
  //       let cat = document.createElement("a");
  //       cat.href = `bycat.html?cat=${category.toLowerCase()}`;
  //       cat.innerHTML = category;
  //       cat.classList.add("cat");
  //       categoriesDiv.appendChild(cat);
  //     });
  //   }
  // }, [movieDataParam, loading, data.categories]); 
  
  

  useEffect(() => {
    const param = newsParam || actDataParam || movieDataParam;
    
    if (param) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(param));
        setData(parsedData);
        document.title = parsedData.name || parsedData.title || "Details";
      } catch (error) {
        console.error("Error parsing data:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [movieDataParam, actDataParam, newsParam, searchParams]);

  if (loading) return <p className="loading">Loading details...</p>;
  if (!data) return <p className="error-message">No details available.</p>;



  return (
    <div className="movie">
      <div className="container">
        <div className={`title-y-t ${movieDate ? "upm-ty-c" : ""}`}>
          <h3 className="title sec-p news-title">
            {data.name ||
              data.title?.match(/^(.*?)(?=\s\(\d{4}\))/)?.[0] ||
              data.title}
          </h3>
          <div className="y-t news-yt">
            {isActor ? (
              <div className="year cat-divs">
                {data.categories?.map((category, index) => (
                  <p key={index} className="news-date born-cat">
                    {category},
                  </p>
                ))}
              </div>
            ) : newsParam ? (
              <>
                <div className="year">{data.date}</div>
                <div className="timeline news-src">{data.source}</div>
              </>
            ) : movieDate ? (
              <div className="year">Coming in: {movieDate}</div>
            ) : (
              <>
                <div className="year">{data.year}</div>
                <div className="timeline">{data.timeline}</div>
              </>
            )}
          {/*<div className="categories"></div>*/}
          </div>
        </div>
        <div className={`img-desc ${movieDate ? "up-id" : ""}`}>
          <img
            src={data.image || "../../public/imgs/tvShowAlt.jpg"}
            alt={data.name || data.title}
            className="movie-img"
          />
          <div className={`desc-rate ${movieDate ? "up-desc" : ""}`}>
            {isActor ? (
              <p className="desc">{data.info || "No Description"}</p>
            ) : movieDate ? (
              <div className="actd">
                <h3>Starring</h3>
                <div className="actors">
                  {data.staring?.length > 0 ? (
                    data.staring.map((actor, index) => (
                      <div key={index} className="act">
                        {actor},
                      </div>
                    ))
                  ) : (
                    <div>Not Found</div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <p className="desc">{data.description || "No Description"}</p>
                <div className="r-b">
                  {!newsParam && (
                    <div className="rating-box">
                      <p className="rating-box-title">IMDb Rating</p>
                      <div className="rating-sub-box">
                        <i className="fa-solid fa-star"></i>
                        <div className="supa-sub-rating-box">
                          <div className="rating-div">
                            <span className="rating">
                              {data.imdbRating?.match(/^\d+\.\d+/)?.[0] || "N/A"}
                            </span>
                            /10
                          </div>
                          {data.imdbRating?.match(/\(\d+K\)$/) && (
                            <div className="rating-count">
                              {data.imdbRating.match(/\(\d+K\)$/)[0]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {!isActor && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={data.link}
                className="slider-link mLink"
              >
                Know More
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
