import React, { Component } from "react";
import { Link } from "react-router-dom";

import CategoryCard from "../../components/CategoryCard";
import { categories } from "../../data";

import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="categories">
          {categories.map(({ src, alt, name, desc }) => (
            <Link
              to={{
                pathname: `/display/${name.replace(/ /g, "+").toLowerCase()}`,
                state: {
                  isCategory: true,
                },
              }}
              key={name}
            >
              <CategoryCard src={src} alt={alt} category={name} desc={desc} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
