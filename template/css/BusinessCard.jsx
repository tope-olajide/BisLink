import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class BusinessCard extends Component {
    render () {
        return (
            <div className="row card-container"><a onClick = 'business-details.html'>
            <div className="col-md-4"> 
              <div className="card  mb-5 mb-5 ml-0 mr-0 shadow-sm">
                <img className="card-img-top" src="../images/images/featured1.jpg" alt="Card image cap" />
                <div className="card-body">
                  <h6 className="card-text">Burger & Lobster</h6>
                   
                    <p className="category ">Restaurant</p> <p className="dot-seperator">•</p> <p className="review">2 Reviews</p> 
                    
                    <ul>
                      <li><span> <FontAwesomeIcon icon="map-marker-alt" /> <span className="space-text"></span> <p>1301 Avenue, Brooklyn, NY 11230</p></span>
                      </li>
                      <li><FontAwesomeIcon icon="fa-mobile-alt" /> <span className="space-text"></span>
                          <p> +44 20 7336 8898</p>
                      </li>
                      <li><FontAwesomeIcon icon="fa-link" /> <span className="space-text"></span>
                          <p>https://burgerandlobster.com</p>
                      </li>
                  </ul>
                  <div className="card-bottom">
                    <div className="fav-icon">  <i className="far fa-heart fa-lg"></i></div>
                    <p>View Business</p>
                </div>
                </div>
              </div>
            </div> </a></div>
        )
    }
}
 export default BusinessCard