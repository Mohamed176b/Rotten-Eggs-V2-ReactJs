import { Link } from "react-router-dom";

const MovieCard = ({ movie, index = null }) => {
  if (!movie) return null;

  const { title = "Unknown", image = "../../public/imgs/tvShowAlt.jpg", imdbRating = "N/A" } = movie;
  const movieDataEncoded = encodeURIComponent(JSON.stringify(movie));

  return (
    <Link
      to={`picked?movie=${movieDataEncoded}`}
      className={`movie-card ${index !== null ? "top" : ""}`}
      {...(index !== null ? { "top-value": index } : {})}
    >
      <div className="movie-img-div">
        <img src={image} alt={title} className="gen-img" loading="lazy" />
      </div>
      <div className="gen-movie-desc">
        <h5>{title}</h5>
        <div className="rate-div2">
          <i className="fa-solid fa-star"></i>
          <p>{imdbRating}</p>
        </div>
      </div>
    </Link>
  );
};

const renderUpcomingCards = (data) =>
  data.map((item) => {
    const upDate = item.date;
    const upTitle = item.list[0].title.match(/^(.*?)(?=\s\(\d{4}.*?\))/)?.[0] || item.list[0].title;
    const upImg = item.list[0].image || "../../public/imgs/tvShowAlt.jpg";
    const upData = encodeURIComponent(JSON.stringify(item.list[0]));
    const upDateData = encodeURIComponent(JSON.stringify(item.date));

    return (
      <Link key={upTitle} to={`picked?up=${upData}&date=${upDateData}`} className="up-card">
        <img src={upImg} alt={upTitle} className="up-img" />
        <div>
          <h5 className="up-h">{upTitle}</h5>
          <p className="up-p">{upDate}</p>
        </div>
      </Link>
    );
  });

const BoxOfficeCard = ({ movie, index }) => {
  const {
    title = "Unknown",
    image = "default.jpg",
    weekendGross = "N/A",
    totalGross = "N/A",
    weeksReleased = "N/A",
    imdbRating = "N/A",
    link = "#",
  } = movie;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="up-card up-card2 top" top-value={index + 1}>
      <img src={image} alt={title} className="up-img" loading="lazy" />
      <div>
        <h5 className="up-h">{title}</h5>
        <div>
          <p className="up-p">Weekend Gross: <span>{weekendGross}</span></p>
          <p className="up-p">Total Gross: <span>{totalGross}</span></p>
          <p className="up-p">Weeks Released: <span>{weeksReleased}</span></p>
          <p className="up-p">IMDb Rating: <span>{imdbRating}</span></p>
        </div>
      </div>
    </a>
  );
};


const renderNewsCards = (newsData) =>
  newsData.map((news) => {
    const { date, description, title, image } = news;
    const newsImg = image || "imgs/newsAlt.jpg";
    const newsDataEncoded = encodeURIComponent(JSON.stringify(news));

    return (
      <Link key={title} to={`picked?news=${newsDataEncoded}`} className="new-news">
        <div className="news-img-div">
          <img src={newsImg} alt={title} className="news-img" />
        </div>
        <div className="news-desc-div">
          <h5 className="news-title">{title}</h5>
          <p className="news-date">{date}</p>
          <p className="news-desc">{description}</p>
        </div>
      </Link>
    );
  });

const BornTodayCard = ({ act }) => {
  const { image, name } = act;
  const actDataEncoded = encodeURIComponent(JSON.stringify(act));

  return (
    <Link key={name} to={`picked?act=${actDataEncoded}`} className="act-born">
      <div className="born-act-img">
        <img src={image} alt={name} />
      </div>
      <h5 className="born-act-name">{name}</h5>
    </Link>
  );
};
export {MovieCard, renderUpcomingCards, renderNewsCards, BornTodayCard, BoxOfficeCard };