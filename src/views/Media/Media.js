import React from "react";

import "./Media.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faThumbsUp,
  faEye,
  faDownload,
  faFileDownload,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

export default function Media(props) {
  const { mediaData, isImage } = props.location.state;
  const mediaClass = isImage ? "image-style" : "video-style";
  const tags = mediaData.tags.split(",");

  const copyURL = () => {
    const dummy = document.createElement("input");
    const URL = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = URL;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };

  const filter = isImage ? "images" : "videos";

  const handleSubmit = (search, filter) => {
    props.history.push(`/display/${search}?filter=all_${filter}`);
  };

  return (
    <div className="media-container">
      <div className={mediaClass}>
        {isImage ? (
          <img src={mediaData.largeImageURL} alt={mediaData.pageURL} />
        ) : (
          <video
            controls={false}
            autoPlay={false}
            muted
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => e.target.pause()}
          >
            <source type="video/mp4" src={mediaData.videos.large.url} />
          </video>
        )}
      </div>

      <div className="media-details">
        <div className="user-info">
          <img
            src={mediaData.userImageURL}
            alt={`user_id : ${mediaData.user_id} `}
          />
          <p>{mediaData.user}</p>
        </div>
        <div className="media-stats">
          <div>
            <FontAwesomeIcon icon={faHeart} />
            <p>{mediaData.favorites}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faThumbsUp} />
            <p>{mediaData.likes}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faEye} />
            <p>{mediaData.views}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faDownload} />
            <p>{mediaData.downloads}</p>
          </div>
        </div>
        <div className="media-tags">
          {tags.map((tag) => (
            <button onClick={() => handleSubmit(tag.trim(), filter)} key={tag}>
              <p>{tag.trim()}</p>
            </button>
          ))}
        </div>
        <div className="download-button">
          <a href={mediaData.largeImageURL} download>
            <FontAwesomeIcon icon={faFileDownload} />
            <p>Free Download</p>
          </a>
        </div>
        <div className="share-button">
          <button type="button" onClick={() => copyURL()}>
            <FontAwesomeIcon icon={faCopy} />
            <p>Copy to Clipboard</p>
          </button>
        </div>
      </div>
    </div>
  );
}
