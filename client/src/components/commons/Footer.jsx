import React, {Component} from "react";
import { Input, Button } from "mdbreact";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      businessName: " ",
      businessLocation: " "
    };
  }
  saveToState(key, value) {
    this.setState({ [key]: value });
    console.log(value);
  }
  handleBusinessSearch =() => {
    window.location = `/businesses/search/business-name=${this.state.businessName}/location=${this.state.businessLocation}`;
  }
  render() {
    return (
      <div id="footer">
<nav class=" footer bottom navbar-expand-sm navbar-dark bg-dark">

<div className = 'container-fluid'>


<div className = 'row mt-5'>
<div className = 'col-4  footer-search-form'>
<form>
            <p className="h5 text-center mb-4">Search for Business</p>
            <div className="grey-text">
              <Input
                label="Your name"
                icon="user"
                group
                type="text"
                onChange={event => {
                  this.saveToState(
                    "businessName",
                    event.target.value
                  );
                }}
              />
              <Input
                label="Your name"
                icon="user"
                group
                type="text"
                onChange={event => {
                  this.saveToState(
                    "businessLocation",
                    event.target.value
                  );
                }}
              />
            
            </div>
            <div className="text-center mb-4">
              <Button color="primary"onClick ={this.handleBusinessSearch} >Search</Button>
            </div>
          </form></div>
          <div className = 'col-7'> 
        <div className = 'copyright-content '>
  
<p className=" d-inline font-weight-bold"> Home </p><p className="dot-seperator d-inline">•</p><p className=" d-inline font-weight-bold"> Add Business </p><p className="dot-seperator d-inline">•</p><p className=" d-inline font-weight-bold"> My Profile </p><p className="dot-seperator d-inline">•</p><p className=" d-inline font-weight-bold"> Notifications </p><p className="dot-seperator d-inline">•</p><p className=" d-inline font-weight-bold"> Logout </p>
<p class="mt-5">Designed with <i class="fas fa-heart fa-lg"></i> by <a href="https://github.com/tope-olajide/BisLink">Temitope</a> <br />Copyright © 2018 BisLink. All rights reserved </p>
 </div>
 </div></div></div>
 </nav> 
      </div>
    );
  }
}
export default Footer
