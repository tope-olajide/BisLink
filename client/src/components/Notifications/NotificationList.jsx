import React, { Component } from "react";
import {
  MDBListGroup, MDBListGroupItem 
} from "mdbreact";
import { Link } from 'react-router-dom';
class NotificationList extends Component {
  render() {
    return (
      <><MDBListGroup className="px-0"><Link to={`/notifications/${this.props.id}`}>
              <MDBListGroupItem className="card" hover >
                <h5 className="pr-5 ">
                {this.props.title}
                </h5>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1" />
                  <small className="text-muted">{this.props.date}</small>
                </div>
              </MDBListGroupItem>{" "}</Link>
              <br />
         </MDBListGroup>
      </>
    );
  }
}
export default NotificationList;
