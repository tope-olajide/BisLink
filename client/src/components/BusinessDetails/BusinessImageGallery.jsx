import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import { Button } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BusinessImageGallery extends Component {
  render() {
    /* const addTransformationToUrl = url => {
      const orignalTransformations = "w_1000,h_600,c_fit";
      const thumbTransformations = "w_250,h_150,c_fit";
      const urlDivider = "/image/upload/";
      const dividedUrl = url.split(urlDivider);
      const originalTransformedUrl = dividedUrl.join(
        `${urlDivider}${orignalTransformations}`
      );
      const thumbTransformedUrl = dividedUrl.join(
        `${urlDivider}${thumbTransformations}`
      );
      return {
        original: originalTransformedUrl,
        thumbnail: thumbTransformedUrl
      };
    };
    const imageGalleryUrl = this.props.businessImageUrl.map(imageUrl => {
      return addTransformationToUrl(imageUrl);
    });
    const images = imageGalleryUrl; */
    return (
      <div className="card p-5 mt-0">
        {/* <ImageGallery items={images} /> */}
        <div className="container mt-0">
          <div className="row">
            <div className="col-md-6 mt-5">
              <h2>{this.props.businessName}</h2>
              <p> {this.props.tagline} </p> <br />
              <Button>
                <h5>Write a Review </h5>
              </Button>
            </div>
            <div className=" mt-4 col-md-6">
              <Button onClick={this.props.upvoteBusiness}>
                <FontAwesomeIcon icon="thumbs-up" size="2x" />{" "}
                <b>{this.props.upvotes}</b>
              </Button>

              <Button onClick={this.props.downvoteBusiness}>
                <FontAwesomeIcon icon="thumbs-down" size="2x" />
                <b>{this.props.downvotes}</b>
              </Button>

              <Button onClick ={this.props.addToFavourite}>
              <FontAwesomeIcon icon={this.props.spinner} spin size="2x" />
                <FontAwesomeIcon icon={[this.props.favouriteIcon, "heart"]} size="2x" />
              </Button> <br />
              <Button disabled>
                <FontAwesomeIcon icon={["far", "eye"]} size="2x" />{" "}
                {this.props.viewCount}
              </Button>
              <Button disabled={!this.props.isBusinessOwner}>
                <FontAwesomeIcon icon="trash" size="2x" />
              </Button>
              <Button disabled={!this.props.isBusinessOwner} onClick={this.props.editBusiness}>
                <FontAwesomeIcon icon="edit" size="2x" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BusinessImageGallery;
