import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './BusinessCard.css'
class BusinessCard extends Component {
    render () {
        return (
            <div className = 'container'>
            <div className="row card-container"> 
            <div className="col-md-5"> 
              <div className="card mb-5 ml-0 mr-0 shadow-sm">
                <img className="card-img-top" src="featured1.jpg" alt="Card image cap" />
                <div className="card-body">
                  <h6 className="card-text">Burger & Lobster</h6>
                    <p className="category ">Restaurant</p> <p className="dot-seperator">•</p> <p className="review">2 Reviews</p> 
                    <ul>
                      <li><span> <FontAwesomeIcon icon="map-marker" /> <span className="space-text"></span> <p>1301 Avenue, Brooklyn, NY 11230</p></span>
                      </li>
                      <li> 
                          <p><FontAwesomeIcon icon="mobile" /><span className="space-text"></span> +44 20 7336 8898</p>
                      </li>
                      <li><FontAwesomeIcon icon="link" /> <span className="space-text"></span>
                          <p>https://burgerandlobster.com</p>
                      </li>
                  </ul>
                  <div className="card-bottom">
                    <div className="fav-icon"> <FontAwesomeIcon icon="heart" /> </div>
                    <p>View Business</p>
                </div>
                </div>
              </div>
            </div> </div></div>
        )
    }
}
 export default BusinessCard