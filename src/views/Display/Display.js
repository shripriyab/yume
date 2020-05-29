import React, { Component } from "react";
import MediaCard from "../../components/MediaCard";

import "./Display.css";

export default class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isImage: true,
    };
  }

  getMedia = async (search, filter) => {
    let isCategory;

    if (this.props.location.state) {
      isCategory = this.props.location.state.isCategory;
    }

    filter = filter ? filter : "all_images";

    const query = isCategory ? "category" : "q";

    const imageTypes = ["photo", "illustration", "vector", "all_images"];

    const type = imageTypes.includes(filter) ? "image" : "video";

    const apiType = imageTypes.includes(filter) ? "" : "videos";

    if (filter === "all_images" || filter === "all_videos") filter = "all";

    const q = search ? `&${query}=${search}` : "";

    const URL = `https://pixabay.com/api/${apiType}?key=16339239-a4d8fce68cd767d9ac3d7474c${q}&${type}_type=${filter}&per_page=35`;

    const response = await fetch(URL);

    const data = await response.json();

    const info = {
      type,
      data,
    };

    return info;
  };

  setData = async () => {
    const search = this.props.match.params.search;

    const params = new URLSearchParams(window.location.search);

    const filter = params.get("filter");

    const { type, data } = await this.getMedia(search, filter);

    this.setState({
      data: data.hits,
      isImage: type === "image",
    });
  };

  async componentDidMount() {
    this.setData();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setData();
    }
  }

  render() {
    const { data, isImage } = this.state;

    console.log(data);

    return (
      <div className="masonry">
        {data.map((element) => (
          <MediaCard key={element.id} isImage={isImage} mediaData={element} />
        ))}
      </div>
    );
  }
}
