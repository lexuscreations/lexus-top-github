import config from "../../config";
import favicon_logo_image from "../../assets/favicon.gif";
import React, { useEffect, useState, useRef } from "react";
import search_icon_image from "../../assets/search-icon.png";

const Header = ({
  githubUserProfiles,
  currentSelectedProfiles,
  onDefaultSelectedProfileChange,
}) => {
  const [userData, setUserData] = useState([]);
  const [isAutoCompleteVisible, setIsAutoCompleteVisible] = useState(false);

  const githubUserSearchFldEl = useRef(null);
  const githubUserSearchFldAutoCompleteEl = useRef(null);

  const init = async () => {
    try {
      const fetchPromises = githubUserProfiles.map(async ({ profile_name }) => {
        const URL = `https://api.github.com/users/${profile_name}`;
        const data = await fetch(URL);
        const result = await data.json();
        return result;
      });

      const userDataArray = await Promise.all(fetchPromises);
      setUserData(userDataArray);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fnForHideAutoComplete = (event) => {
    if (
      !githubUserSearchFldEl.current.contains(event.target) &&
      !githubUserSearchFldAutoCompleteEl.current.contains(event.target)
    ) {
      setIsAutoCompleteVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", fnForHideAutoComplete);
    init();

    return () => document.removeEventListener("click", fnForHideAutoComplete);
  }, []);

  return (
    <header>
      <h1>
        <img src={favicon_logo_image} alt="favicon_logo" />
        <div>
          <span>Top</span>Github
        </div>
      </h1>

      <div className="searchContainer">
        <div
          className="searchBoxContainer"
          style={
            isAutoCompleteVisible
              ? {
                  borderBottomRightRadius: "0px",
                  borderBottomLeftRadius: "0px",
                }
              : {}
          }
        >
          <img
            src={search_icon_image}
            alt="search-icon"
            className="search-icon"
          />
          <input
            type="search"
            value={currentSelectedProfiles}
            ref={githubUserSearchFldEl}
            onFocus={() => setIsAutoCompleteVisible(true)}
            placeholder="Search GitHub Users"
            readOnly
          />
        </div>
        <div
          ref={githubUserSearchFldAutoCompleteEl}
          onClick={(event) => {
            const clickedDiv = event.target.closest("div");
            if (clickedDiv) {
              setIsAutoCompleteVisible(false);
              onDefaultSelectedProfileChange(clickedDiv.dataset.profilename);
            }
          }}
          className={`autoCompleteUserProfileOptionsContainer ${
            isAutoCompleteVisible ? "active" : ""
          }`}
        >
          {userData.map(({ avatar_url, login }, index) => {
            return (
              <div data-profilename={login} key={index}>
                <img src={avatar_url} alt="UserProfilePic" width="35px" />
                {(() => {
                  login = login?.trim();
                  return login.length > config.headerMaxProfileNameLength
                    ? login.substring(0, config.headerMaxProfileNameLength) +
                        "..."
                    : login;
                })()}
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
