import React, { Component } from "react";
import Slider from "react-slick";
import { Button } from 'mdbreact';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BusinessSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 700,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 1,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className = 'card p-5 mt-0'>
        <Slider {...settings}>
          <div>
            <img className="" src={this.props.img1} />
          </div>
          <div>
          <img className="" src={this.props.img2} />
          </div>
          <div>
          <img className="" src={this.props.img3} />
          </div>
          <div>
          <img className="" src={this.props.img4} />
          </div>
        </Slider>
        <div className = 'container mt-0'>
<div className = 'row'>
<div className= 'col-md-6 mt-5'>
<h2>{this.props.businessName}</h2>
<p> {this.props.tagline} </p>
</div>
<div className= ' mt-4 col-md-6'>
<Button > <FontAwesomeIcon icon="thumbs-up" size="2x" /> <b>{this.props.upvotes}</b></Button>
<Button > <FontAwesomeIcon icon="thumbs-down" size="2x" /><b>{this.props.downvotes}</b></Button>
<Button >  <FontAwesomeIcon icon={["far","heart" ]}size="2x" /></Button>
<Button> <h5>Write a Review </h5></Button>
{/* <Button > <FontAwesomeIcon icon="eye" size="2x" /> <b>10</b></Button> */}
<Button disabled>  <FontAwesomeIcon icon={["far","eye" ]}size="2x" /> {this.props.viewCount}</Button>
</div>
</div>
          </div>
      </div>
    );
  }
}
export default BusinessSlider;