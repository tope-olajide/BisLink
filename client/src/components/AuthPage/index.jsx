import React, { Component } from "react";
import HomePage from "./HomeAnimation";
import AuthNavBar from '../AuthPage/AuthNavBar'
class Home extends Component {
  render() {
    return (
      <div>
      <AuthNavBar />
      <HomePage
        caption1="Bis-Link is a direct optimized way of submitting your business details to nearby city directories."
        caption2="Search for businesses, services, houses, apartments and lands for sale or for rent"
        caption3="Be visible! Obtain new customers and generate more traffic."
        caption4="Get reviews and grow your business reputation online."
        caption5="BisLink will make your website link-building strategy better..."
        caption6="... and imporove your online business awareness to increase your sales"
      /></div>
    );
  }
}
export default Home