import React, { Component } from 'react';
import './BusinessCard.css'

class BusinessCard extends Component {
    render () {
        return (
            <div className="container content-container">
            <div className="row card-container">
            <div className="col-md-4">
      <div className="card  mb-5 mb-5 ml-0 mr-0 shadow-sm">
        <img className="card-img-top" src="featured1.jpg" alt="Card image cap" />
        <div className="card-body">
          <h6 className="card-text">Burger & Lobster</h6>
            <div className = 'cat-rewiew'>
            <p className="category ">Restaurant</p> <p className="dot-seperator">•</p> <p className="review">2 Reviews</p> 
            </div>
            <ul>
              <li><span><i className="fas fa-map-marker-alt"></i><span className="space-text"></span> <p>1301 Avenue, Brooklyn, NY 11230</p></span>
              </li>
              <li><i className="fas fa-mobile-alt"> </i> <span className="space-text"></span>
                  <p> +44 20 7336 8898</p>
              </li>
              <li><i className="fas fa-link"></i><span className="space-text"></span>
                  <p>https://burgerandlobster.com</p>
              </li>
          </ul>
          <div className="card-bottom">
            <div className="fav-icon">  <i className="far fa-heart fa-lg"></i></div>
            <p>View Business</p>
        </div>
        </div>
      </div>
    </div>
            </div>
            </div>
        )
    }
}
 export default BusinessCard