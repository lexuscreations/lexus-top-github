import React from "react";
import Aside from "../../components/Aside";
import ReposListingSection from "../../components/ReposListingSection";

const Main = ({ currentSelectedUserProfilesData }) => {
  return (
    <main>
      <Aside
        currentSelectedUserProfilesData={
          currentSelectedUserProfilesData.profile_result_data || {}
        }
      />
      <ReposListingSection
        currentSelectedUserProfilesData={
          currentSelectedUserProfilesData.repo_result_data || []
        }
      />
    </main>
  );
};

export default React.memo(Main);
