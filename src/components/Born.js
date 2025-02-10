import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../API"; 

export default function Born() {
  const { getBornToday } = useApi();
  const [bornToday, setBornToday] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBornToday = async () => {
      try {
        const data = await getBornToday();
        setBornToday(data?.list || []);
      } catch (error) {
        console.error("Failed to fetch Born Today:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBornToday();
  }, []);

  return (
    <div className="news">
      <div className="container">
        <div className="news-outBox">
          <p className="sec-p">Born Today</p>
          {loading ? (
            <div className="spinner spinner-born"></div>
          ) : (
            <div className="newss actBorn">
              {bornToday.length > 0 ? (
                bornToday.map((act, index) => {
                  const { info, name, image, categories = [] } = act;
                  const actData = encodeURIComponent(JSON.stringify(act));

                  return (
                    <Link to={/picked?act=${actData}`} className="new-news" key={index}>
                      <div className="news-img-div born-img-div">
                        <img
                          src={image || "../imgs/newsAlt.jpg"}
                          alt={name}
                          className="news-img act-born-img"
                        />
                      </div>
                      <div className="news-desc-div">
                        <h5 className="news-title">{name}</h5>
                        <div className="cat-divs">
                          {categories.map((category, idx) => (
                            <p key={idx} className="news-date born-cat">
                              {category},
                            </p>
                          ))}
                        </div>
                        <p className="news-desc">{info || "No Description Available"}</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="error-message">No actors found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
