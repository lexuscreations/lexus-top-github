import React from "react";
import RepoCard from "./RepoCard";

const RepoSection = ({ currentSelectedUserProfilesData: DATA }) => {
  return (
    <div className="repo_section_container">
      <span>Repositories</span>
      <hr />
      <section>
        {DATA.map((repo, index) => (
          <RepoCard key={index} index={index} repo={repo} />
        ))}
      </section>
      <hr />
    </div>
  );
};

export default React.memo(RepoSection);
