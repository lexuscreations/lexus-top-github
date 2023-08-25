import React from "react";
import config from "../../../config";
import avatar_image from "../../../assets/avatar.png";
import repo_count_icon from "../../../assets/files.png";
import world_icon_image from "../../../assets/world.gif";
import since_year_icon from "../../../assets/calender.png";
import open_icon_image from "../../../assets/open-icon.png";
import linkedin_icon_image from "../../../assets/linkedin.png";
import location_icon_image from "../../../assets/location.png";

const Aside = ({ currentSelectedUserProfilesData: DATA }) => {
  return (
    <aside>
      {Object.keys(DATA).length > 0 && (
        <>
          <img
            src={DATA.avatar_url || avatar_image}
            alt=""
            id="avatar_URL"
            width="25%"
            style={{ borderRadius: "50%" }}
          />

          {DATA.name && <h2 id="user_name">{DATA.name}</h2>}

          {DATA.login && <span id="login_name">{DATA.login}</span>}

          {DATA.bio && <p id="profile_bio">{DATA.bio}</p>}

          {DATA.html_url && (
            <a href={DATA.html_url} target="_blank" id="repo_URL">
              <img src={open_icon_image} alt="open-icon" />
              See on github
            </a>
          )}

          {DATA.blog && (
            <a href={DATA.blog} id="blog_url">
              <img src={world_icon_image} alt="world-icon" />
              {DATA.blog.split("//")[1]}
            </a>
          )}

          {config.social__linkedin_URL && (
            <a href={config.social__linkedin_URL} id="linkedin_social">
              <img src={linkedin_icon_image} alt="linkedin-icon" />
              {config.social__linkedin_URL.split(".com")[1]}
            </a>
          )}

          {DATA.location && (
            <div id="location">
              <img src={location_icon_image} alt="location-icon" />
              {DATA.location}
            </div>
          )}

          {DATA.public_repos && (
            <div id="public_repos_count">
              <img src={repo_count_icon} alt="total-repo-count-icon" />
              {DATA.public_repos}
            </div>
          )}

          {DATA.created_at && (
            <div id="since_year">
              <img src={since_year_icon} alt="since-year-icon" />
              {new Date(DATA.created_at).getFullYear()}
            </div>
          )}
        </>
      )}
    </aside>
  );
};

export default React.memo(Aside);
