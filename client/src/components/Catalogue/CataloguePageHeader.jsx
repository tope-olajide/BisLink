import React, { Component } from "react";
import NavBar from '../commons/NavigationBar'
import { FormInline, Input, Button } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class CataloguePageHeader extends Component {
  render() {
      return (
     <div>
      <div className="biz-header"></div>
      <div className='hero-caption'>
<h1 className="hero-title"> Discover great places in Nigeria</h1>
        <p className="hero-paragraph">
          Let's uncover the best places to eat, drink, and shop nearest to you.
        </p>
        <div className=" row hero-search-container">
        <div className="col-md-6 input-wrapper">
			<input type="text" className='form-control' placeholder="Business name" />
		</div>
    <div className="col-md-6 input-wrapper"><input type="text" className='form-control' placeholder="Location" /></div>
        </div>
        <div className="text-center hero-search-button"><Button>Search</Button></div>
        <div className='text-center mt-4'> <p className='browse-by d-inline'><a href ='#'>Browse by popular</a></p> <p className='browse-by d-inline px-2'>or</p><p  className='browse-by d-inline'> <a href ='#'>Recently added</a></p>
       </div>
       </div>
      <div>
        <h1 className="text-center my-5 featured-text">
          <FontAwesomeIcon icon="briefcase" /> Featured Places
        </h1>
      </div>
    </div>         
      )

  }
}
export default CataloguePageHeader;
