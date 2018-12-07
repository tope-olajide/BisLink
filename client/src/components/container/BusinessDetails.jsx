import React, { Component } from "react";
import BusinessDetailsPage from "./../presentation/BusinessDetailsPage";
import BusinesssSlider from "./../presentation/BusinessSlider"
class BusinessDetails extends Component {
  render() {
    return (
        <div>
    <BusinesssSlider 
    img1 = 'featured1.jpg' 
    img2 = 'featured2.jpg' 
    img3 = 'featured3.jpg' 
    img4 = 'featured4.jpg' 
    />
    <BusinessDetailsPage /></div>
    );
  }
}
export default BusinessDetails;
