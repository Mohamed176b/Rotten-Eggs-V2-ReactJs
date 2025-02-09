import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const searchRef = useRef(null);
  const magIconRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/search?search=${searchValue}`)
    }
  };

  const handleFocus = () => {
    magIconRef.current.classList.add("fa-fade");
  };

  const handleBlur = () => {
    magIconRef.current.classList.remove("fa-fade");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="header">
      <div className="container">
        <div>
          <Link className="logo" to="/">
            <img src="/imgs/egg.png" alt="Rotten Eggs Logo" />
            <p>
              Rotten <span>Eggs</span>
            </p>
          </Link>
        </div>
        <div className="search">
          <i
            ref={magIconRef}
            className="fa-sharp fa-solid fa-magnifying-glass"
            onClick={handleSearch}
          ></i>
          <input
            ref={searchRef}
            type="search"
            name="search"
            id="search"
            placeholder="Search everything"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="pro">
          <div>
            <i className="fa-regular fa-bell"></i>
          </div>
          <img src="imgs/profile.jpg" alt="User profile" />
        </div>
      </div>
    </div>
  );
};

export default Header;
