import config from "./config";
import Main from "./layout/Main/Main";
// import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import { useEffect, useState } from "react";

function removeStartingWords(inputString, wordsArray) {
  const lowerCaseInput = inputString.toLowerCase();

  for (const word of wordsArray) {
    const lowerCaseWord = word.toLowerCase();
    const delimiter = " | ";

    if (lowerCaseInput.startsWith(lowerCaseWord + delimiter)) {
      inputString = inputString.slice((word + delimiter).length).trim();
      break;
    }
  }

  return inputString;
}

const App = () => {
  const [currentSelectedProfiles, setCurrentSelectedProfiles] = useState(
    config.githubDefaultProfiles
  );
  const [currentSelectedUserProfilesData, setCurrentSelectedUserProfilesData] =
    useState({});

  const welcome_screen = document.querySelector(".welcome_screen");

  const fetchGithubUserData = async () => {
    const URL = `https://api.github.com/users/${currentSelectedProfiles}`;
    const data = await fetch(URL);
    const profile_result_data = await data.json();

    const URL_repo = `https://api.github.com/users/${currentSelectedProfiles}/repos`;
    const data_repo = await fetch(URL_repo);
    let repo_result_data = await data_repo.json();

    repo_result_data = repo_result_data.filter((repo) =>
      new RegExp(
        `\\b(${config.listOnlyWhenThisInDescription.join("|")})\\b`,
        "i"
      ).test(repo.description)
    );

    repo_result_data.forEach((repo, ind) => {
      repo_result_data[ind].description = removeStartingWords(
        repo.description,
        config.listOnlyWhenThisInDescription
      );
    });

    setCurrentSelectedUserProfilesData({
      profile_result_data,
      repo_result_data,
    });
  };

  const onDefaultSelectedProfileChange = (currentSelectedUser) =>
    setCurrentSelectedProfiles(currentSelectedUser);

  useEffect(() => {
    fetchGithubUserData();

    config.isIntentionallyLoadingEnabled
      ? setTimeout(() => {
          welcome_screen.style.display = "none";
        }, config.intentionallyLoadingTime)
      : (welcome_screen.style.display = "none");
  }, [currentSelectedProfiles]);

  return (
    <div className="container">
      <Header
        currentSelectedProfiles={currentSelectedProfiles}
        githubUserProfiles={config.githubUserProfiles}
        onDefaultSelectedProfileChange={onDefaultSelectedProfileChange}
      />
      <Main currentSelectedUserProfilesData={currentSelectedUserProfilesData} />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
