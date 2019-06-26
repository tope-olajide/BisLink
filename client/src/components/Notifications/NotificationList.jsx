import React, { Component } from "react";
import { MDBListGroup, MDBListGroupItem } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
class NotificationList extends Component {
  render() {
    return (
      <>
        <MDBListGroup className="px-1">
          <Link to={`/notifications/${this.props.id}`}>
            <MDBListGroupItem className="py-1 my-1 text-left" hover>
              <FontAwesomeIcon icon="bell" className="mr-4" />{" "}
              <h6 className=" d-inline  ">{this.props.title}</h6>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1" />
                <small className="text-muted">{this.props.date}</small>
              </div>
            </MDBListGroupItem>{" "}
          </Link>
        </MDBListGroup>
      </>
    );
  }
}
export default NotificationList;
