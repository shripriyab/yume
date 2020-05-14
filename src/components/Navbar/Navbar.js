import React from "react";

import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      filterDisplay: "Images",
      isOpen: false,
      selectedFilter: "all_images",
    };
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  selectFilter = (e) => {
    this.setState({
      filterDisplay: e.target.innerHTML,
      selectedFilter: e.target.getAttribute("data-type"),
    });
  };

  handleSubmit = (e) => {
    const { search, selectedFilter } = this.state;

    e.preventDefault();

    this.props.history.push(
      `/display/${search
        .replace(/ /g, "+")
        .toLowerCase()}?filter=${selectedFilter}`
    );
  };

  render() {
    const { search, filterDisplay, isOpen } = this.state;

    return (
      <nav id="navbar">
        <Link to="/">
          <div className="logo">
            <h1>Yume</h1>
          </div>
        </Link>
        <div className="search-bar">
          <div className="search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <form onSubmit={this.handleSubmit} id="search-form">
            <label htmlFor="search-input" className="submit">
              Search
            </label>
            <input
              value={search}
              type="text"
              name="search"
              id="search-input"
              placeholder="Search"
              onChange={this.handleSearch}
            />
            <button className="submit" type="submit"></button>
          </form>
          <div className="filter" onClick={() => this.toggleDropdown()}>
            <div className="selected-filter">
              <p>{filterDisplay}</p>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {isOpen && (
              <div className="drop-down">
                <span
                  data-type="all_images"
                  onClick={(e) => this.selectFilter(e)}
                >
                  Images
                </span>
                <div className="media-type">
                  <span data-type="photo" onClick={(e) => this.selectFilter(e)}>
                    Photos
                  </span>
                  <span
                    data-type="illustration"
                    onClick={(e) => this.selectFilter(e)}
                  >
                    Illustrations
                  </span>
                  <span
                    data-type="vector"
                    onClick={(e) => this.selectFilter(e)}
                  >
                    Vectors
                  </span>
                </div>
                <span
                  data-type="all_videos"
                  onClick={(e) => this.selectFilter(e)}
                >
                  Videos
                </span>
                <div className="media-type">
                  <span data-type="film" onClick={(e) => this.selectFilter(e)}>
                    Films
                  </span>
                  <span
                    data-type="animation"
                    onClick={(e) => this.selectFilter(e)}
                  >
                    Animations
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <Link to="/explore">
          <div className="explore">
            <h3>Explore</h3>
          </div>
        </Link>
      </nav>
    );
  }
}

export default withRouter(Navbar);
