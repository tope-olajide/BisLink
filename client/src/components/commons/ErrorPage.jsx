import React, { Component } from "react";
import NavigationBar from "../commons/NavigationBar";
import Footer from "../commons/Footer";
class ErrorPage extends Component {
  render() {
    return (
      <>
        <NavigationBar />
        <div className="error-container">
          <img className="error-image" src="error-pix.jpg" alt={""} />
        </div>
        <Footer />
      </>
    );
  }
}
export default ErrorPage;
