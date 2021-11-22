import React, { Component } from "react";
import { Link } from "react-router-dom";

import MediaCard from "../../components/MediaCard";

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  getImages = async () => {
    const URL = `https://pixabay.com/api/?key=16339239-a4d8fce68cd767d9ac3d7474c&per_page=35&order=latest`;

    const response = await fetch(URL);

    const data = await response.json();

    this.setState({
      images: data.hits,
    });
  };

  async componentDidMount() {
    this.getImages();
  }

  render() {
    const { images } = this.state;
    return (
      <div className="masonry">
        {images.map((element) => (
            <Link
            to={{
              pathname: `/media/${element.id}`,
              state: {
                mediaData: element,
                isImage: true,
              },
            }}
            key={element.id}
          >
            <MediaCard key={element.id} isImage mediaData={element} />
          </Link>
        ))}
      </div>
    );
  }
}
