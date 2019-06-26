import React, { Component } from "react";
import { Button } from "mdbreact";
class CataloguePageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: " ",
      businessLocation: " "
    };
  }
  saveToState(key, value) {
    this.setState({ [key]: value });
  }
  handleBusinessSearch = () => {
    window.location = `/businesses/search/name=${
      this.state.businessName
    }/location=${this.state.businessLocation}`;
  };
  render() {
    return (
      <div>
        <div className="biz-header">
          <div className="hero-caption">
            <h1 className="hero-title"> Discover great places in Nigeria</h1>
            <p className="hero-paragraph">
              Let's uncover the best places to eat, drink, and shop nearest to
              you.
            </p>
            <div className=" row hero-search-container">
              <div className="col-md-6 input-wrapper">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Business name"
                  onChange={event => {
                    this.saveToState("businessName", event.target.value);
                  }}
                />
              </div>
              <div className="col-md-6 input-wrapper">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  onChange={event => {
                    this.saveToState("businessLocation", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="text-center hero-search-button">
              <Button onClick={this.handleBusinessSearch}>Search</Button>
            </div>
            <div className="text-center mt-4">
              {" "}
              <p className="browse-by d-inline">
                <a href="/businesses/search/sort=popular">Browse by popular</a>
              </p>{" "}
              <p className="browse-by d-inline px-2">or</p>
              <p className="browse-by d-inline">
                {" "}
                <a href="/businesses/search/sort=recent">Recently added</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CataloguePageHeader;
