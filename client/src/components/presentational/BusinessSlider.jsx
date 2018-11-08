import React, { Component } from "react";
import Slider from "react-slick";

class BusinessSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
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
      <div>
        <h2> Responsive </h2>
        <Slider {...settings}>
          <div>
            <img class="" src={this.props.img1} />
          </div>
          <div>
          <img class="" src={this.props.img2} />
          </div>
          <div>
          <img class="" src={this.props.img3} />
          </div>
          <div>
          <img class="" src={this.props.img4} />
          </div>
        </Slider>
      </div>
    );
  }
}
export default BusinessSlider;