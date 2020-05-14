import React from "react";

import "./CategoryCard.css";

export default class CategoryCard extends React.Component {
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
    const { isHover } = this.state;
    const { src, alt, category, desc } = this.props;

    return (
      <div
        className="category-card"
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
      >
        <img src={src} alt={alt} className="bg-image" />
        {isHover && <div id="overlay"></div>}
        <div className="card-text">
          <h3>{category}</h3>
          {isHover && <p>{desc}</p>}
        </div>
      </div>
    );
  }
}
