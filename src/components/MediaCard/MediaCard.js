import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faThumbsUp,
  faEye,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import "./MediaCard.css";

export default class MediaCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false,
    };
  }

  handleHover = (bool) => {
    this.setState({
      isHover: bool,
    });
  };

  render() {
    const { isImage, mediaData } = this.props;
    const { isHover } = this.state;

    return isImage ? (
      <div
        className="item"
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
      >
        <img src={mediaData.largeImageURL} alt={mediaData.pageURL} />
        {isHover && (
          <div id="overlay">
            <div className="views">
              <FontAwesomeIcon icon={faEye} />
              <p>{mediaData.views}</p>
            </div>
            <div className="likes">
              <div>
                <FontAwesomeIcon icon={faHeart} />
                <p>{mediaData.favorites}</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faThumbsUp} />
                <p>{mediaData.likes}</p>
              </div>
            </div>

            <div className="user">
              <FontAwesomeIcon icon={faUser} />
              <p>{mediaData.user}</p>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div className="item">
        <video
          width="320"
          height="240"
          controls
          autoPlay={false}
          muted
          onMouseEnter={(e) => e.target.play()}
          onMouseLeave={(e) => e.target.pause()}
        >
          <source type="video/mp4" src={mediaData.videos.large.url} />
        </video>
      </div>
    );
  }
}
