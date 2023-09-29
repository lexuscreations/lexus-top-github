import config from "../config";
import React, { useState } from "react";
import file_code_image from "../assets/file-code.png";
import edit_icon_image from "../assets/edit-icon.png";
import copy_icon_image from "../assets/copy-icon.png";
import check_icon_image from "../assets/check-icon.png";
import update_icon_image from "../assets/update-icon.png";
import download_icon_image from "../assets/download-icon.png";

const RepoCard = ({ repo, index }) => {
  const [copyClipBoardImage, setCopyClipBoardImage] = useState(copy_icon_image);

  const formatDateFn = (inputDate) =>
    new Date(inputDate).toISOString().slice(8, 10) +
    "/" +
    new Date(inputDate).toISOString().slice(5, 7) +
    "/" +
    new Date(inputDate).toISOString().slice(0, 4);

  const copyToClipBoardOnClickHandlerFn = async (event, clone_url) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(clone_url);

      setCopyClipBoardImage(check_icon_image);
      event.target.style.filter = "invert(0)";

      setTimeout(() => {
        setCopyClipBoardImage(copyClipBoardImage);
        event.target.style.filter = "invert(1)";
      }, 1500);
    } catch (err) {
      console.error("Failed to copy:", err.message);
    }
  };

  return (
    <div id={`repoCard-${index + 1}`}>
      <div className="repo_section_card_header">
        {repo.visibility && (
          <span id={`visibility-${index + 1}`}>{repo.visibility}</span>
        )}

        {repo.default_branch && (
          <span id={`default_branch-${index + 1}`}>{repo.default_branch}</span>
        )}
      </div>

      <div className="repo_section_card_main">
        {repo.name && (
          <span
            id={`repo_name-${index + 1}`}
            onClick={() => window.open(repo.html_url, "_blank")}
            title={repo.name?.trim()}
          >
            {(() => {
              repo.name = repo.name?.trim();
              return repo.name.length > config.maxRepoNameLength
                ? repo.name.substring(0, config.maxRepoNameLength) + "..."
                : repo.name;
            })()}
          </span>
        )}

        {(repo.description || repo.name) && (
          <span
            id={`description-${index + 1}`}
            title={repo.description?.trim() || repo.name?.trim()}
          >
            {(() => {
              repo.description = repo.description?.trim() || repo.name?.trim();
              return repo.description.length > config.maxRepoDescriptionLength
                ? repo.description.substring(
                    0,
                    config.maxRepoDescriptionLength
                  ) + "..."
                : repo.description;
            })()}
          </span>
        )}
      </div>

      <div className="repo_section_card_footer">
        {repo.language && (
          <span id={`language-${index + 1}`}>
            <img src={file_code_image} alt="file-code" />
            {repo.language}
          </span>
        )}

        {repo.created_at && (
          <span id={`created_at-${index + 1}`}>
            <img src={edit_icon_image} alt="edit-icon" />
            {formatDateFn(repo.created_at)}
          </span>
        )}

        {repo.updated_at && (
          <span id={`updated_at-${index + 1}`}>
            <img src={update_icon_image} alt="update-icon" />
            {formatDateFn(repo.updated_at)}
          </span>
        )}

        {repo.clone_url && (
          <span id={`clone_url-${index + 1}`}>
            <img
              onClick={(e) =>
                copyToClipBoardOnClickHandlerFn(e, repo.clone_url)
              }
              src={copyClipBoardImage}
              alt="copy-icon"
            />
          </span>
        )}

        {repo.full_name && repo.default_branch && (
          <a
            id={`download_url-${index + 1}`}
            href={`https://github.com/${repo.full_name}/archive/refs/heads/${repo.default_branch}.zip`}
            target="_self"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={download_icon_image} alt="download-icon" />
          </a>
        )}
      </div>
    </div>
  );
};

export default RepoCard;
