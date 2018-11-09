import React, { Component } from "react";
import BusinessDetails from "./BusinessDetails";
import BusinessSlider from "./BusinessSlider";
class BusinessDetailsPage extends Component {
  render() {
    return (
      <div>
        <BusinessSlider
          img1="featured1.jpg"
          img2="featured2.jpg"
          img3="featured3.jpg"
          img4="featured4.jpg"
        />
        <BusinessDetails />
      </div>
    );
  }
}
export default BusinessDetailsPage;
