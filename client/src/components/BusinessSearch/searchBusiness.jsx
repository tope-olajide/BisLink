import React, { Component } from "react";
import { Link } from "react-router-dom";
import Image from "react-graceful-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class searchBusiness extends Component {
  render() {
    return (
      <>
        <div className="col-md-4">
          <Link to={`/business-details/${this.props.id}`}>
            <div className="card  mb-5 mb-5 ml-0 mr-0 shadow-md rounded-0">
              <Image
                className="card-img-top rounded-0"
                src={this.props.image}
                alt="Card image cap"
              />
              <div className="card-body">
                <h6 className="biz-name">{this.props.businessName}</h6>
                <div className="cat-rewiew">
                  <p className="category ">{this.props.category}</p>{" "}
                  <p className="dot-seperator">•</p>{" "}
                  <p className="review">{this.props.reviewCount} Review(s)</p>
                </div>
                <ul>
                  <li>
                    <span>
                      <FontAwesomeIcon icon="map-marker-alt" size="1x" />
                      <span className="space-text" />{" "}
                      <p className="biz-address ">
                        {this.props.businessAddress}
                      </p>
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon="mobile-alt" size="1x" />
                    <span className="space-text" />
                    <p> {this.props.phoneNumber}</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon="link" size="1x" />
                    <span className="space-text" />
                    <p>{this.props.website}</p>
                  </li>
                </ul>
                <div className="card-bottom">
                  <div className="fav-icon">
                    {" "}
                    <FontAwesomeIcon icon={["far", "heart"]} size="1x" />
                  </div>
                  <p>View Business</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}
export default searchBusiness;
