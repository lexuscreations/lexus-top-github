import React from "react";
import Aside from "./components/Aside";
import RepoSection from "./components/RepoSection";

const Main = ({ currentSelectedUserProfilesData }) => {
  return (
    <main>
      <Aside
        currentSelectedUserProfilesData={
          currentSelectedUserProfilesData.profile_result_data || {}
        }
      />
      <RepoSection
        currentSelectedUserProfilesData={
          currentSelectedUserProfilesData.repo_result_data || []
        }
      />
    </main>
  );
};

export default React.memo(Main);
