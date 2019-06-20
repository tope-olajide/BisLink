import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BusinessImageGallery extends Component {
  render() {
      const addTransformationToUrl = url => {
      const orignalTransformations = "w_1150,h_420,c_fit,c_pad,b_black/";
      const thumbTransformations = "w_350,h_250/";
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
        thumbnail: thumbTransformedUrl,
      };
    }; 
     const imageGalleryUrl = this.props.businessImageUrl.map(businessImage => {
      return addTransformationToUrl(businessImage.imageUrl);
    });
    const images = imageGalleryUrl;   
 
console.log(this.props.businessImageUrl)
    return (
      <div className="card shadow-sm pt-2 pb-5 mt-0">
      <div className=" gallery-container border border p-1">
           <ImageGallery 
          items={images} 
          thumbnailPosition={'bottom'} />   </div> 
        <div className="container mt-0">
          <div className="row">
            <div className="col-md-6 mt-5">
              <h2>{this.props.businessName}</h2>
              <p> {this.props.tagline} </p> <br />
              <Button onClick={this.props.scrollToReview}>
                <h5>Write a Review </h5>
              </Button>
            </div>
            <div className="float-right mt-4 col-md-6">
              <Button onClick={this.props.upvoteBusiness}>
                <FontAwesomeIcon icon="thumbs-up" size="2x" />{" "}
                <b>{this.props.upvotes}</b>
              </Button>

              <Button onClick={this.props.downvoteBusiness}>
                <FontAwesomeIcon icon="thumbs-down" size="2x" />
                <b>{this.props.downvotes}</b>
              </Button>

              <Button onClick ={this.props.addToFavourite}>
              <FontAwesomeIcon icon={this.props.spinnerIcon} spin size="2x" />
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
