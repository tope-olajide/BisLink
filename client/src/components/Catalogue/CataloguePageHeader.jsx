import React, { Component } from "react";
import NavBar from '../commons/NavigationBar'
import { FormInline, Input, Button } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class CataloguePageHeader extends Component {
  render() {
      return (
     <div>
        <NavBar />
      <div className="biz-header">
        <h1 className="hero-title"> Discover great places in Nigeria</h1>
        <p className="hero-paragraph">
          Let's uncover the best places to eat, drink, and shop nearest to you.
        </p>
        <FormInline className="search-container">
          <Input label="Business Name" icon="envelope" group type="text" />
          <Input label="Location" icon="lock" group type="text" />
          <Button>Search</Button>
        </FormInline>
      </div>
      <div>
        <h1 className="text-center my-5 featured-text">
          <FontAwesomeIcon icon="briefcase" /> Featured Places
        </h1>
      </div>
    </div>         
      )

  }
}
export default CataloguePageHeader;
