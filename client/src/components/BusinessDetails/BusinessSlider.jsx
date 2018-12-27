import React, { Component } from "react";
import Slider from "react-slick";

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
        <div className = 'container mt-3'>
<div className = 'row'>
<div className= 'col-md-6'>
<h2>Tasty Hand-Pulled Noodles</h2>
<p> Innovative cooking, paired with fine wines in a modern setting. </p>
</div>
<div className= 'col-md-6'>
<button className= 'mt-4 btn btn-md btn-outline-dark'> Write a Review</button>
</div>
</div>
          </div>
      </div>
    );
  }
}
export default BusinessSlider;