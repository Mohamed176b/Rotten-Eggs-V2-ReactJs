async function apiRequest(
  method,
  url,
  key,
  endpoint,
  value = null,
) {
  const myHeaders = new Headers({
    "x-apihub-key": key,
    "x-apihub-host": "Movies-Verse.allthingsdev.co",
    "x-apihub-endpoint": endpoint,
    "cache-control": "public, max-age=0, must-revalidate",
    "content-type": "application/json; charset=utf-8",
    expires: "0",
    pragma: "no-cache",
  });

  let requestOptions;

  switch (method) {
    case "GET":
      requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      break;

    case "POST":
      const raw = JSON.stringify({ query: value });
      requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      break;

    default:
      throw new Error(`Unsupported method: ${method}`);
  }

  // spinners.forEach((spinner) => {
  //   if (spinner) {
  //     spinner.current.style.display = "block";
  //   }
  // });

  let maxRetries = 5;
  let retries = 0;
  let success = false;
  let data;

  while (retries < maxRetries && !success) {
    try {
      const response = await fetch(url, requestOptions);
      if (response.status === 429) {
        retries++;
        const retryAfter = response.headers.get("Retry-After");
        const delay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : 2 ** retries * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        data = await response.json();
        success = true;
      }
    } catch (error) {
      if (retries >= maxRetries - 1) {
        // spinners.forEach((spinner) => {
        //   if (spinner) {
        //     spinner.current.style.display = "none";
        //   }
        // });
        console.error(`Error: ${error}`);
        throw error;
      }
      retries++;
      const delay = 2 ** retries * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // spinners.forEach((spinner) => {
  //   if (spinner) {
  //     spinner.current.style.display = "none";
  //   }
  // });

  return data;
}





const API_KEY = process.env.REACT_APP_ROTTEN_EGGS_API_KEY;
const SEARCH_MOVIE_URL = process.env.REACT_APP_SEARCH_MOVIE_URL;
const MOST_POPULAR_MOVIES_URL = process.env.REACT_APP_MOST_POPULAR_MOVIES_URL;
const GET_AVAILABLE_GENERS_URL = process.env.REACT_APP_GET_AVAILABLE_GENERS_URL;
const GET_MOVIES_BY_GENER_URL = process.env.REACT_APP_GET_MOVIES_BY_GENER_URL;
const UPCOMING_MOVIES_URL = process.env.REACT_APP_UPCOMING_MOVIES_URL;
const UPCOMING_SERIES_URL = process.env.REACT_APP_UPCOMING_SERIES_URL;
const GET_MOVIE_NEWS_URL = process.env.REACT_APP_GET_MOVIE_NEWS_URL;
const GET_CELEBRITIES_NEWS_URL = process.env.REACT_APP_GET_CELEBRITIES_NEWS_URL;
const GET_BORN_TODAY_URL = process.env.REACT_APP_GET_BORN_TODAY_URL;
const GET_TOP_250_MOVIES_URL = process.env.REACT_APP_GET_TOP_250_MOVIES_URL;
const GET_TOP_BOXOFFICE_URL = process.env.REACT_APP_GET_TOP_BOXOFFICE_URL;


const useApi = () => {

  const searchMovie = (value) =>
    apiRequest("POST", SEARCH_MOVIE_URL,
      API_KEY, "06344c37-2a53-4936-be17-34568bdc31ab", value);

  const mostPopularMovies = () =>
      apiRequest("GET", MOST_POPULAR_MOVIES_URL,
        API_KEY, "611cdfda-546d-4cc9-91ab-bfdac3194613");

  const getAvailableGenres = () =>
      apiRequest("GET", GET_AVAILABLE_GENERS_URL,
          API_KEY, "462dfdab-8876-412d-af11-765956a494a4");

  const getMoviesByGenre = (value) =>
      apiRequest("GET", `${GET_MOVIES_BY_GENER_URL}/get-by-genre?genre=${value}`,
          API_KEY, "dae9e3d3-6b6c-4fde-b298-ada2806ae563");

  const upcomingMovies = () =>
      apiRequest("GET", UPCOMING_MOVIES_URL,
          API_KEY, "4f700f4a-4bd2-4604-8d5b-7b5e4c976c65");

  const upcomingSeries = () =>
      apiRequest("GET", UPCOMING_SERIES_URL,
          API_KEY, "ee6324b5-b074-419b-ac03-9b818d30321f");

  const getMovieNews = () =>
      apiRequest("GET", GET_MOVIE_NEWS_URL,
          API_KEY, "9f3f88f2-24e7-486e-8360-0c8d1f223079");

  const getCelebritiesNews = () =>
      apiRequest("GET", GET_CELEBRITIES_NEWS_URL,
          API_KEY, "310bc946-0139-4f0d-a955-1f7ab9e122c9");

  const getBornToday = () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const date = today.getDate();
      return apiRequest("GET", `${GET_BORN_TODAY_URL}/get-born-by-date?month=${month}&date=${date}`,
        API_KEY, "8d95029b-93c4-47f8-aff1-b5be77d700d9");
  };

  const getTop250Movies = () =>
      apiRequest("GET", GET_TOP_250_MOVIES_URL,
        API_KEY, "d3ee0b1f-e51c-46bc-99eb-c660726b0a1b");

  const getTopBoxOffice = () =>
      apiRequest("GET", GET_TOP_BOXOFFICE_URL,
        API_KEY, "5122e0f8-a949-45a9-aedf-5eaf61c6085b");

  return { searchMovie, mostPopularMovies, getAvailableGenres, getMoviesByGenre, upcomingMovies, getTopBoxOffice, upcomingSeries, getTop250Movies, getBornToday, getMovieNews, getCelebritiesNews};
};

export default useApi;
