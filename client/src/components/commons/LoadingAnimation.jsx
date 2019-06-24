import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import "./loadingAnimation.css";

class LoadingAnimation extends Component {
  render() {
    return (
      <>
        <NavigationBar />
        <div className="loading-container">
          <img className="loader" src="../loader.gif" alt="" />
        </div>
      </>
    );
  }
}
export default LoadingAnimation;
