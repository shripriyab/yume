import React, { Component } from "react";

import "./Display.css";

export default class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagesData: [],
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

    const URL = `https://pixabay.com/api/${apiType}?key=16339239-a4d8fce68cd767d9ac3d7474c${q}&${type}_type=${filter}`;

    const response = await fetch(URL);

    return await response.json();
  };

  setData = async () => {
    const search = this.props.match.params.search;

    const params = new URLSearchParams(window.location.search);

    const filter = params.get("filter");

    const data = await this.getMedia(search, filter);

    this.setState({
      imagesData: data.hits,
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
    const { imagesData } = this.state;

    return (
      <div>
        {imagesData.map((image) => (
          <img key={image.id} src={image.previewURL} alt={image.pageURL} />
        ))}
      </div>
    );
  }
}
