import React from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home";
import Explore from "./views/Explore";
import Display from "./views/Display";
import Media from "./views/Media";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/explore" exact component={Explore} />
      <Route path="/display/:search?" exact component={Display} />
      <Route path="/media/:id" exact component={Media} />
    </BrowserRouter>
  );
}

export default App;
